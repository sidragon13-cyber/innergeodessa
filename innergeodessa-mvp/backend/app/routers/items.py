from fastapi import APIRouter

from ..database import CURRENT_BANK_VERSION, connect


router = APIRouter()


@router.get("/api/items")
def get_items():
    with connect() as conn:
        rows = conn.execute(
            """SELECT source_item_id AS item_id, dimension, subdimension,
                      keyed_pole, form, wording, master_order,
                      question_bank_version
               FROM question_bank_items
               WHERE question_bank_version=?
               ORDER BY master_order""",
            (CURRENT_BANK_VERSION,),
        ).fetchall()
    return [dict(r) for r in rows]
