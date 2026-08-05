from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class AssessmentModuleConfig:
    module: str
    question_bank_version: str
    expected_item_count: int
    scoring_strategy: str


ASSESSMENT_MODULES = {
    "personality": AssessmentModuleConfig(
        module="personality",
        question_bank_version="personality-v2.0.0",
        expected_item_count=72,
        scoring_strategy="personality",
    ),
    "riasec": AssessmentModuleConfig(
        module="riasec",
        question_bank_version="riasec-v0.1.0",
        expected_item_count=36,
        scoring_strategy="riasec",
    ),
}

DEFAULT_ASSESSMENT_MODULE = "personality"


def get_assessment_module_config(
    module: Optional[str],
) -> AssessmentModuleConfig:
    resolved_module = module or DEFAULT_ASSESSMENT_MODULE

    try:
        return ASSESSMENT_MODULES[resolved_module]
    except KeyError as error:
        raise ValueError(
            f'Unsupported assessment module: "{resolved_module}"'
        ) from error
