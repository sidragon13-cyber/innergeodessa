import {
  Fragment,
  type ReactNode,
} from "react";

import type {
  FixedReportRichBlock,
  FixedReportTableAlignment,
} from "@/data/report/fixed-assets/fixed-report-rich-content";

export interface FixedReportRichContentProps {
  readonly blocks:
    readonly FixedReportRichBlock[];

  readonly className?: string;
}

/**
 * Pure presentation component for one already-authorized
 * fixed personality report payload.
 *
 * Important:
 * - receives only serializable AST blocks
 * - does not import the 64-report asset registry
 * - does not read Markdown
 * - does not perform entitlement checks
 * - does not use dangerouslySetInnerHTML
 */
export function FixedReportRichContent({
  blocks,
  className = "",
}: FixedReportRichContentProps) {
  return (
    <div
      className={[
        "fixed-report-rich-content",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {blocks.map(
        (
          block,
          index,
        ) =>
          renderBlock(
            block,
            index,
          ),
      )}
    </div>
  );
}

function isShortPrintableListItem(
  value: string,
): boolean {
  const visibleText =
    value
      .replace(
        /[*_`]/g,
        "",
      )
      .replace(
        /\s+/g,
        "",
      )
      .trim();

  return (
    visibleText.length > 0 &&
    Array.from(
      visibleText,
    ).length <= 7
  );
}

function renderBlock(
  block: FixedReportRichBlock,
  index: number,
): ReactNode {
  const key =
    `${block.type}-${index}`;

  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={key}
          className="my-4 whitespace-pre-line leading-7"
        >
          {renderInlineText(
            block.text,
            `${key}-text`,
          )}
        </p>
      );

    case "heading":
      return renderHeading(
        block.level,
        block.text,
        key,
      );

    case "unordered-list": {
      const shortItemFlags =
        block.items.map(
          isShortPrintableListItem,
        );

      const shortItemCount =
        shortItemFlags.filter(
          Boolean,
        ).length;

      const hasCompactShortItems =
        shortItemCount >= 2;

      return (
        <ul
          key={key}
          className={[
            "my-5 list-disc space-y-2 pl-6",
            hasCompactShortItems
              ? "fixed-report-short-list"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {block.items.map(
            (
              item,
              itemIndex,
            ) => (
              <li
                key={`${key}-${itemIndex}`}
                className={[
                  "pl-1 leading-7",
                  hasCompactShortItems &&
                  shortItemFlags[
                    itemIndex
                  ]
                    ? "fixed-report-short-list-item"
                    : hasCompactShortItems
                      ? "fixed-report-long-list-item"
                      : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {renderInlineText(
                  item,
                  `${key}-${itemIndex}`,
                )}
              </li>
            ),
          )}
        </ul>
      );
    }

    case "ordered-list":
      return (
        <ol
          key={key}
          className="my-5 list-decimal space-y-2 pl-6"
        >
          {block.items.map(
            (
              item,
              itemIndex,
            ) => (
              <li
                key={`${key}-${itemIndex}`}
                className="pl-1 leading-7"
              >
                {renderInlineText(
                  item,
                  `${key}-${itemIndex}`,
                )}
              </li>
            ),
          )}
        </ol>
      );

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-2 border-[var(--color-accent)] pl-5"
        >
          <div className="whitespace-pre-line leading-7 text-[var(--color-text-secondary)]">
            {renderInlineText(
              block.text,
              `${key}-quote`,
            )}
          </div>
        </blockquote>
      );

    case "table":
      return (
        <div
          key={key}
          className="my-6 overflow-x-auto"
        >
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                {block.header.map(
                  (
                    cell,
                    cellIndex,
                  ) => (
                    <th
                      key={`${key}-head-${cellIndex}`}
                      scope="col"
                      style={{
                        textAlign:
                          toTextAlign(
                            block
                              .alignments[
                              cellIndex
                            ] ??
                              null,
                          ),
                      }}
                      className="border-b border-[var(--color-border-strong)] px-3 py-3 align-top font-semibold text-[var(--color-text)]"
                    >
                      {renderInlineText(
                        cell,
                        `${key}-head-${cellIndex}`,
                      )}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {block.rows.map(
                (
                  row,
                  rowIndex,
                ) => (
                  <tr
                    key={`${key}-row-${rowIndex}`}
                  >
                    {row.map(
                      (
                        cell,
                        cellIndex,
                      ) => (
                        <td
                          key={`${key}-row-${rowIndex}-${cellIndex}`}
                          style={{
                            textAlign:
                              toTextAlign(
                                block
                                  .alignments[
                                  cellIndex
                                ] ??
                                  null,
                              ),
                          }}
                          className="border-b border-[var(--color-border)] px-3 py-3 align-top leading-6"
                        >
                          {renderInlineText(
                            cell,
                            `${key}-row-${rowIndex}-${cellIndex}`,
                          )}
                        </td>
                      ),
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      );

    case "divider":
      return (
        <hr
          key={key}
          className="my-8 border-0 border-t border-[var(--color-border)]"
        />
      );
  }
}

function renderHeading(
  level: 1 | 2 | 3,
  text: string,
  key: string,
): ReactNode {
  /**
   * The complete report page already owns the document H1.
   * Source Markdown H1/H2/H3 therefore becomes
   * section-relative H2/H3/H4 in the rendered page.
   */
  switch (level) {
    case 1:
      return (
        <h2
          key={key}
          className="ig-heading-3 mb-3 mt-9 text-[var(--color-text)]"
        >
          {renderInlineText(
            text,
            `${key}-heading`,
          )}
        </h2>
      );

    case 2:
      return (
        <h3
          key={key}
          className="mb-3 mt-8 text-xl font-semibold leading-snug text-[var(--color-text)]"
        >
          {renderInlineText(
            text,
            `${key}-heading`,
          )}
        </h3>
      );

    case 3:
      return (
        <h4
          key={key}
          className="mb-2 mt-6 text-base font-semibold leading-snug text-[var(--color-text)]"
        >
          {renderInlineText(
            text,
            `${key}-heading`,
          )}
        </h4>
      );
  }
}

function toTextAlign(
  alignment:
    FixedReportTableAlignment,
):
  | "left"
  | "center"
  | "right" {
  return alignment ??
    "left";
}

/**
 * Deterministic inline renderer for the only emphasis
 * grammar present in the audited fixed reports:
 *
 * ***bold italic***
 * **bold**
 * *italic*
 *
 * Unknown / unmatched markers remain plain text.
 */
function renderInlineText(
  value: string,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] =
    [];

  let cursor = 0;
  let textStart = 0;
  let nodeIndex = 0;

  const flushText = (
    end: number,
  ) => {
    if (end <= textStart) {
      return;
    }

    nodes.push(
      <Fragment
        key={`${keyPrefix}-text-${nodeIndex}`}
      >
        {value.slice(
          textStart,
          end,
        )}
      </Fragment>,
    );

    nodeIndex += 1;
  };

  while (
    cursor < value.length
  ) {
    const marker =
      value.startsWith(
        "***",
        cursor,
      )
        ? "***"
        : value.startsWith(
              "**",
              cursor,
            )
          ? "**"
          : value.startsWith(
                "*",
                cursor,
              )
            ? "*"
            : null;

    if (!marker) {
      cursor += 1;
      continue;
    }

    const contentStart =
      cursor +
      marker.length;

    const closingIndex =
      value.indexOf(
        marker,
        contentStart,
      );

    if (
      closingIndex < 0
    ) {
      cursor +=
        marker.length;

      continue;
    }

    flushText(
      cursor,
    );

    const inner =
      value.slice(
        contentStart,
        closingIndex,
      );

    const innerNodes =
      renderInlineText(
        inner,
        `${keyPrefix}-inline-${nodeIndex}`,
      );

    if (
      marker === "***"
    ) {
      nodes.push(
        <strong
          key={`${keyPrefix}-strong-em-${nodeIndex}`}
        >
          <em>
            {innerNodes}
          </em>
        </strong>,
      );
    } else if (
      marker === "**"
    ) {
      nodes.push(
        <strong
          key={`${keyPrefix}-strong-${nodeIndex}`}
        >
          {innerNodes}
        </strong>,
      );
    } else {
      nodes.push(
        <em
          key={`${keyPrefix}-em-${nodeIndex}`}
        >
          {innerNodes}
        </em>,
      );
    }

    nodeIndex += 1;

    cursor =
      closingIndex +
      marker.length;

    textStart =
      cursor;
  }

  flushText(
    value.length,
  );

  return nodes;
}
