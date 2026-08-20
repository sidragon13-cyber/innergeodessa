import { text } from "./shared";

export const K912_MASTER_TEMPLATE = {
  identity: text("InnerGeo K912 Interest Exploration & Development Guide", "InnerGeo K912 兴趣探索与发展指南"),
  purpose: text("A parent-and-child guide based on 42 current-interest responses across six domains and seven facets per domain.", "本指南供家长与孩子共同阅读，依据六个兴趣方向、每个方向七个侧面，共四十二项当前兴趣回应生成。"),
  jointReading: text("Read the report together. Compare its evidence with real projects, courses, team tasks, maker work, science investigations, coding, creative work, and movement experiences.", "请家长与孩子共同阅读，并把报告证据与真实项目、课程、团队任务、创客活动、科学探究、编程、创意活动及运动体验相互对照。"),
  scale: text("The five response choices provide response precision; they do not create five rigid report bands.", "五个回应选项用于提高回应的细致程度，并不代表五种固定的报告等级。"),
  evidence: text("Item responses support facet evidence; facet evidence adds context to persisted domain scores. Small differences are described cautiously.", "题目回应形成侧面证据，侧面证据为已保存的领域分数补充背景。较小差异会被谨慎描述。"),
} as const;

export const K912_SECTION_TITLES = [
  text("Report Identity", "报告说明"), text("Parent & Child Executive Summary", "家长与孩子执行摘要"),
  text("Six-Domain Interest Profile", "六维兴趣地图"), text("Current Interest Structure", "当前兴趣结构"),
  text("Highlighted Interest Drivers", "主要兴趣方向"), text("Behaviour Evidence", "行为证据"),
  text("Interest Combination", "兴趣组合"), text("Broader Interest Context", "更广泛的兴趣背景"),
  text("Exploration Environments", "探索环境"), text("What to Explore Next", "下一步探索什么"),
  text("Parent + Child Observation Plan", "家长与孩子观察计划"), text("Methodology & Interpretation Boundaries", "方法与解释边界"),
] as const;
