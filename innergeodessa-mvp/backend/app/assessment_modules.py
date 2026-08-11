from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class AssessmentModuleConfig:
    module: str
    question_bank_version: str
    expected_item_count: int
    scoring_strategy: str
    form: Optional[str] = None


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


KIDS_ASSESSMENT_FORMS = {
    "k68": AssessmentModuleConfig(
        module="kids",
        form="k68",
        question_bank_version="KIDS-K68-RF-V1",
        expected_item_count=32,
        scoring_strategy="kids",
    ),
    "k912": AssessmentModuleConfig(
        module="kids",
        form="k912",
        question_bank_version="KIDS-K912-RF-V1",
        expected_item_count=40,
        scoring_strategy="kids",
    ),
}


DEFAULT_ASSESSMENT_MODULE = "personality"


def get_assessment_module_config(
    module: Optional[str],
    form: Optional[str] = None,
) -> AssessmentModuleConfig:
    resolved_module = module or DEFAULT_ASSESSMENT_MODULE

    if resolved_module == "kids":
        if not form:
            raise ValueError(
                "Kids assessment form is required. "
                "Supported forms: k68, k912."
            )

        try:
            return KIDS_ASSESSMENT_FORMS[form]
        except KeyError as error:
            raise ValueError(
                f'Unsupported kids assessment form: "{form}"'
            ) from error

    if form is not None:
        raise ValueError(
            'Assessment form is only supported for module "kids".'
        )

    try:
        return ASSESSMENT_MODULES[resolved_module]
    except KeyError as error:
        raise ValueError(
            f'Unsupported assessment module: "{resolved_module}"'
        ) from error
