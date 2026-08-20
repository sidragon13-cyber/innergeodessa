from __future__ import annotations

from dataclasses import dataclass
from statistics import fmean
from typing import Iterable, Mapping


K68_SCORING_VERSION = "KIDS-SCORING-V2"
K912_SCORING_VERSION = "KIDS-SCORING-V2"

# Backward-compatible alias for legacy callers.
# New Kids code must use the form-specific scoring version.
KIDS_SCORING_VERSION = K912_SCORING_VERSION

K68_BANK_VERSION = "KIDS-K68-RF-V2"
K912_BANK_VERSION = "KIDS-K912-RF-V2"

K68_DOMAINS = (
    "think",
    "discover",
    "build",
    "create",
    "connect",
    "move",
)

K912_DOMAINS = (
    "think",
    "discover",
    "build",
    "create",
    "connect",
    "move",
)

# Backward-compatible alias for the current K912 V1 contract.
# K68 no longer uses this global domain set.
KIDS_DOMAINS = K912_DOMAINS

PATTERN_EMERGING = "Emerging Explorer"
PATTERN_BROAD = "Broad Explorer"
PATTERN_BLENDED = "Blended Interest Pattern"
PATTERN_CLEAR = "Clear Exploration Pattern"


@dataclass(frozen=True)
class KidsScoredItem:
    item_id: str
    domain: str
    raw_value: int


def _form_config(form: str) -> dict:
    if form == "k68":
        return {
            "age_form": "K68",
            "age_band": "6-8",
            "domains": K68_DOMAINS,
            "items_per_domain": 5,
            "allowed_values": {1, 3, 5},
            "minimum_raw": 5,
            "maximum_raw": 25,
            "bank_version": K68_BANK_VERSION,
            "scoring_version": K68_SCORING_VERSION,
        }

    if form == "k912":
        return {
            "age_form": "K912",
            "age_band": "9-12",
            "domains": K912_DOMAINS,
            "items_per_domain": 7,
            "allowed_values": {1, 2, 3, 4, 5},
            "minimum_raw": 7,
            "maximum_raw": 35,
            "bank_version": K912_BANK_VERSION,
            "scoring_version": K912_SCORING_VERSION,
        }

    raise ValueError(
        f"Unsupported Kids form: {form}"
    )


def _stable_rank(
    scores: Mapping[str, float],
    domains: tuple[str, ...],
) -> list[str]:
    domain_order = {
        domain: index
        for index, domain in enumerate(domains)
    }

    return sorted(
        domains,
        key=lambda domain: (
            -scores[domain],
            domain_order[domain],
        ),
    )


def _exact_tie_groups(
    scores: Mapping[str, float],
    ranking: list[str],
) -> list[list[str]]:
    groups: dict[float, list[str]] = {}

    for domain in ranking:
        groups.setdefault(
            scores[domain],
            [],
        ).append(domain)

    return [
        group
        for group in groups.values()
        if len(group) >= 2
    ]


def classify_kids_scores(
    scores: Mapping[str, float],
    domains: tuple[str, ...] = K912_DOMAINS,
) -> dict:
    if set(scores) != set(domains):
        raise ValueError(
            "Kids score map must contain exactly the configured domains."
        )

    numeric_scores = {
        domain: float(scores[domain])
        for domain in domains
    }

    for domain, value in numeric_scores.items():
        if not 0 <= value <= 100:
            raise ValueError(
                f"{domain} score must be between 0 and 100."
            )

    ranking = _stable_rank(
        numeric_scores,
        domains,
    )

    ordered = [
        numeric_scores[domain]
        for domain in ranking
    ]

    mean_score = fmean(ordered)
    maximum = ordered[0]
    minimum = ordered[-1]
    spread = maximum - minimum

    first_second_gap = (
        ordered[0] - ordered[1]
    )
    second_third_gap = (
        ordered[1] - ordered[2]
    )
    third_fourth_gap = (
        ordered[2] - ordered[3]
    )

    leading_cluster = [
        domain
        for domain in ranking
        if numeric_scores[domain]
        >= maximum - 10
    ]

    outside_cluster = [
        domain
        for domain in ranking
        if domain not in leading_cluster
    ]

    if outside_cluster:
        cluster_gap = (
            min(
                numeric_scores[domain]
                for domain in leading_cluster
            )
            - max(
                numeric_scores[domain]
                for domain in outside_cluster
            )
        )
    else:
        cluster_gap = None

    exact_ties = _exact_tie_groups(
        numeric_scores,
        ranking,
    )

    if (
        mean_score < 45
        and maximum < 60
    ):
        pattern_type = PATTERN_EMERGING

    elif (
        mean_score >= 45
        and spread <= 20
        and len(leading_cluster) >= 5
    ):
        pattern_type = PATTERN_BROAD

    elif (
        len(leading_cluster) in (2, 3)
        and cluster_gap is not None
        and cluster_gap >= 15
    ):
        pattern_type = PATTERN_BLENDED

    else:
        pattern_type = PATTERN_CLEAR

    if pattern_type == PATTERN_EMERGING:
        highlighted_domains: list[str] = []

        emerging_signals = [
            domain
            for domain in ranking
            if numeric_scores[domain]
            >= mean_score + 10
        ]

        blended_domains: list[str] = []

    elif pattern_type == PATTERN_BROAD:
        highlighted_domains = []
        emerging_signals = []
        blended_domains = []

    elif pattern_type == PATTERN_BLENDED:
        highlighted_domains = list(
            leading_cluster
        )
        emerging_signals = []
        blended_domains = list(
            leading_cluster
        )

    else:
        # The scoring engine preserves the complete
        # Leading Cluster as eligibility truth.
        # Presentation layers may later limit visible
        # examples without changing scoring facts.
        highlighted_domains = list(
            leading_cluster
        )
        emerging_signals = []
        blended_domains = []

    return {
        "domainRanking": ranking,
        "exactTies": exact_ties,
        "firstSecondGap": first_second_gap,
        "secondThirdGap": second_third_gap,
        "thirdFourthGap": third_fourth_gap,
        "highestLowestSpread": spread,
        "meanScore": mean_score,
        "maxScore": maximum,
        "minScore": minimum,
        "leadingCluster": leading_cluster,
        "clusterGap": cluster_gap,
        "patternType": pattern_type,
        "highlightedDomains": highlighted_domains,
        "emergingSignals": emerging_signals,
        "blendedDomains": blended_domains,
    }


def score_kids(
    *,
    form: str,
    question_bank_version: str,
    items: Iterable[KidsScoredItem],
) -> dict:
    config = _form_config(form)

    if (
        question_bank_version
        != config["bank_version"]
    ):
        raise ValueError(
            "Kids question-bank version does not match form."
        )

    item_list = list(items)
    domains = config["domains"]

    expected_total = (
        config["items_per_domain"]
        * len(domains)
    )

    if len(item_list) != expected_total:
        raise ValueError(
            "Kids scorer received wrong item count."
        )

    item_ids = {
        item.item_id
        for item in item_list
    }

    if len(item_ids) != expected_total:
        raise ValueError(
            "Kids scorer received duplicate item IDs."
        )

    grouped: dict[str, list[int]] = {
        domain: []
        for domain in domains
    }

    for item in item_list:
        if item.domain not in grouped:
            raise ValueError(
                f"Unknown Kids domain: {item.domain}"
            )

        if (
            isinstance(item.raw_value, bool)
            or not isinstance(item.raw_value, int)
        ):
            raise ValueError(
                "Kids raw responses must be integers."
            )

        if (
            item.raw_value
            not in config["allowed_values"]
        ):
            raise ValueError(
                f"Response value {item.raw_value} "
                f"is invalid for {form}."
            )

        grouped[item.domain].append(
            item.raw_value
        )

    for domain in domains:
        if (
            len(grouped[domain])
            != config["items_per_domain"]
        ):
            raise ValueError(
                f"{domain} does not contain the expected "
                "number of scored Kids items."
            )

    raw_scores = {
        domain: sum(grouped[domain])
        for domain in domains
    }

    minimum_raw = config["minimum_raw"]
    maximum_raw = config["maximum_raw"]

    denominator = (
        maximum_raw
        - minimum_raw
    )

    normalised_scores = {
        domain: (
            (
                raw_scores[domain]
                - minimum_raw
            )
            / denominator
        )
        * 100
        for domain in domains
    }

    facts = classify_kids_scores(
        normalised_scores,
        domains,
    )

    tied_domains = {
        domain
        for group in facts["exactTies"]
        for domain in group
    }

    leading_set = set(
        facts["leadingCluster"]
    )

    highlighted_set = set(
        facts["highlightedDomains"]
    )

    domain_results = [
        {
            "domainId": domain,
            "rawScore": raw_scores[domain],
            "normalisedScore": normalised_scores[
                domain
            ],
            "exactTie": (
                domain in tied_domains
            ),
            "leadingClusterMember": (
                domain in leading_set
            ),
            "highlighted": (
                domain in highlighted_set
            ),
        }
        for domain in domains
    ]

    return {
        "ageForm": config["age_form"],
        "ageBand": config["age_band"],

        # A separate assessment-level version has not
        # yet been frozen. Do not invent one.
        "assessmentVersion": None,

        "questionBankVersion": (
            question_bank_version
        ),
        "releaseFormVersion": (
            question_bank_version
        ),
        "scoringVersion": (
            config["scoring_version"]
        ),

        "domainRawScores": raw_scores,
        "domainNormalisedScores": (
            normalised_scores
        ),
        "domainResults": domain_results,

        "domainRanking": (
            facts["domainRanking"]
        ),
        "exactTies": facts["exactTies"],

        "firstSecondGap": (
            facts["firstSecondGap"]
        ),
        "secondThirdGap": (
            facts["secondThirdGap"]
        ),
        "thirdFourthGap": (
            facts["thirdFourthGap"]
        ),
        "highestLowestSpread": (
            facts["highestLowestSpread"]
        ),

        "meanScore": facts["meanScore"],
        "maxScore": facts["maxScore"],
        "minScore": facts["minScore"],

        "leadingCluster": (
            facts["leadingCluster"]
        ),
        "clusterGap": (
            facts["clusterGap"]
        ),

        "patternType": (
            facts["patternType"]
        ),
        "highlightedDomains": (
            facts["highlightedDomains"]
        ),
        "emergingSignals": (
            facts["emergingSignals"]
        ),
        "blendedDomains": (
            facts["blendedDomains"]
        ),

        # Result-content versions are intentionally
        # nullable until their own release gates.
        "freeResultVersion": None,
        "premiumReportVersion": None,
    }
