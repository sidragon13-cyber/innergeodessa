import {KIDS_RESPONSE_CONTRACTS} from '../schema';
import {K68_1020_CONTENT_SOURCE} from './fixed-assets/generated-k68-report-assets';
import {K68_REPORT_DOMAINS,type K68ReportDomainId as Domain} from './types';
import {resolveK68ReportSelection,type K68ReportFacts} from './facts';
import {k68Questions} from '../questions/k68';
import type {FixedReportRichBlock as Rich} from '@/data/report/fixed-assets/fixed-report-rich-content';
import type {K68ProfessionalReportSectionId as SectionId} from './generator';

type Cell={readonly blocks:readonly SourceBlock[]};
type SourceBlock={readonly kind:'paragraph';readonly text:string;readonly style?:string|null}|{readonly kind:'table';readonly rows:readonly (readonly Cell[])[]};
type Fixed={readonly source_path:string;readonly sha256:string;readonly pair:readonly Domain[];readonly blocks:readonly SourceBlock[]};
type SlotText={readonly text_template?:string;readonly items?:readonly string[];readonly weeks?:readonly string[]};
type SlotSource=SlotText&{readonly reverse_top1?:SlotText&{readonly leading_domain:Domain;readonly secondary_domain:Domain;readonly approval:string}};
type Variable={readonly source_path:string;readonly content:{readonly pair:readonly Domain[];readonly gap_code:string;readonly slots:Readonly<Record<string,SlotSource>>}};
type Catalog={readonly version:string;readonly fixed:Readonly<Record<string,Fixed>>;readonly variables:Readonly<Record<string,Variable>>};
const catalog=K68_1020_CONTENT_SOURCE as unknown as Catalog;
export const K68_1020_SLOT_IDS=['P1_RESULT','P1_SUMMARY','P3_PROFILE','P3_EVIDENCE','P3_RELATION','P4_INTEREST','P5_ACTIVITY','P6_PLAN','P7_OBSERVATION'] as const;
type SlotId=typeof K68_1020_SLOT_IDS[number];
const labels:Record<Domain,string>={think:'思考',discover:'探索',build:'建构',create:'创造',connect:'连接',move:'行动'};
const english:Record<Domain,string>={think:'Think',discover:'Discover',build:'Build',create:'Create',connect:'Connect',move:'Move'};
export interface K68BindingIssue {readonly group:number;readonly gapCode:string;readonly slot:string;readonly code:string;readonly reason:string}
export class K68ContentBindingError extends Error {
 readonly issues:readonly K68BindingIssue[];
 constructor(issues:readonly K68BindingIssue[]){super('本次结果暂缺适用的已审核报告内容。');this.name='K68ContentBindingError';this.issues=issues;}
}
export interface K68BoundSlot {readonly blocks:readonly Rich[];readonly source:string;readonly selectedText:readonly string[];readonly omittedText:readonly string[]}
interface SummarySentenceOrigin {readonly slot:'P1_RESULT'|'P1_SUMMARY';readonly blockIndex:number;readonly sentenceIndex:number}
export interface K68SummaryDuplicate {readonly text:string;readonly removed:SummarySentenceOrigin;readonly retained:SummarySentenceOrigin}
export interface K68ContentBinding {
 readonly version:'K68-1020';readonly selection:ReturnType<typeof resolveK68ReportSelection>;
 readonly slots:Readonly<Record<SlotId,K68BoundSlot>>;
 readonly sections:readonly {readonly id:SectionId;readonly titleZh?:string;readonly blocks:readonly Rich[]}[];
 readonly source:{readonly path:string;readonly sha256:string};
 readonly evidence:'verified-question-responses-only';
 readonly executiveSummaryDuplicates:readonly K68SummaryDuplicate[];
}
const para=(text:string):Rich=>({type:'paragraph',text});
const heading=(text:string):Rich=>({type:'heading',level:3,text});
const text=(b:SourceBlock):string=>b.kind==='paragraph'?b.text:b.rows.map(r=>r.map(c=>c.blocks.map(text).join('\n')).join(' | ')).join('\n');
function rich(blocks:readonly SourceBlock[]):Rich[]{
 return blocks.flatMap((b):Rich[]=>{
  if(b.kind==='paragraph'){
   const t=b.text.trim();if(!t)return [];
   if(t.startsWith('• '))return [{type:'unordered-list',items:[t.slice(2)]}];
   if(/^(?:活动卡|特点[一二]|快乐本身|喜欢但|简单的|怎样判断|什么时候)/.test(t))return [heading(t)];
   return [para(t)];
  }
  if(b.rows.length===1&&b.rows[0].length===1)return rich(b.rows[0][0].blocks);
  if(b.rows.length===1&&b.rows[0].length===2)return [heading(b.rows[0][0].blocks.map(text).join('\n')),...rich(b.rows[0][1].blocks)];
  const rows=b.rows.map(r=>r.map(c=>c.blocks.map(text).join('\n').trim()));
  return [{type:'table',header:rows[0]??[],alignments:(rows[0]??[]).map(()=>null),rows:rows.slice(1)}];
 });
}
function section(fixed:Fixed,n:number):SourceBlock[]{
 const start=fixed.blocks.findIndex(b=>b.kind==='paragraph'&&b.text.startsWith(`0${n}.`));
 if(start<0)throw new Error(`Missing fixed section ${n}`);
 const next=fixed.blocks.findIndex((b,i)=>i>start&&b.kind==='paragraph'&&/^0[1-8]\./.test(b.text));
 return fixed.blocks.slice(start+1,next<0?undefined:next);
}
function sourceDomain(b:SourceBlock):Domain|undefined{return K68_REPORT_DOMAINS.find(d=>text(b).includes(english[d]));}
function card(domain:Domain):Rich[]{
 const donor=catalog.fixed['01'];
 const b=section(donor,1).find(b=>b.kind==='table'&&b.rows.length===1&&b.rows[0].length===2&&sourceDomain({kind:'paragraph',text:b.rows[0][0].blocks.map(text).join('')})===domain);
 if(!b)throw new Error(`Missing approved domain card ${domain}`);return rich([b]);
}
function mapBlocks(fixed:Fixed,domain:Domain):SourceBlock[]{
 const blocks=section(fixed,3);const i=blocks.findIndex(b=>b.kind==='paragraph'&&b.text.includes('兴趣发展地图')&&b.text.includes(english[domain]));
 if(i<0)throw new Error(`Missing approved hobby map ${domain}`);
 const end=blocks.findIndex((b,j)=>j>i&&b.kind==='table');if(end<0)throw new Error('Missing hobby table');return blocks.slice(i,end+1);
}
function donorMap(domain:Domain):Rich[]{
 const donor=Object.values(catalog.fixed).find(f=>f.pair.includes(domain));if(!donor)throw new Error('Missing approved donor');
 return rich(mapBlocks(donor,domain));
}
function rankLabel(selection:ReturnType<typeof resolveK68ReportSelection>,d:Domain){
 const group=selection.rankGroups.find(g=>g.domains.includes(d))!;return `${group.domains.length>1?'并列':''}第${group.rank}名`;
}
function rankedHeading(facts:K68ReportFacts,s:ReturnType<typeof resolveK68ReportSelection>,d:Domain){return heading(`${labels[d]} ${english[d]}｜${facts.scores[d]}分 · ${rankLabel(s,d)}`);}
function profile(fixed:Fixed,domain:Domain,facts:K68ReportFacts,s:ReturnType<typeof resolveK68ReportSelection>):Rich[]{
 const all=section(fixed,2);const start=all.findIndex(b=>b.kind==='paragraph'&&/^2\.[12]\s/.test(b.text)&&b.text.includes(english[domain]));
 if(start<0)throw new Error('Missing primary profile');const end=all.findIndex((b,i)=>i>start&&b.kind==='paragraph'&&/^2\.[1234]\s/.test(b.text));
 return [rankedHeading(facts,s,domain),...rich(all.slice(start+1,end<0?undefined:end))];
}
function resultBlocks(facts:K68ReportFacts,s:ReturnType<typeof resolveK68ReportSelection>):Rich[]{
 return [{type:'table',header:['兴趣维度','本次换算分','本次排名'],alignments:[null,'right',null],rows:s.ranking.map(d=>[`${labels[d]} ${english[d]}`,`${facts.scores[d]}分`,rankLabel(s,d)])},para(`本次最高两项实际相差${s.gap}分。`)];
}
function verifyEvidence(facts:K68ReportFacts,issue:(slot:string,code:string,reason:string)=>void):Rich[]{
 if(facts.questionBankVersion!=='KIDS-K68-RF-V2'||facts.scoringVersion!=='KIDS-SCORING-V2'){
  issue('P3_EVIDENCE','EVIDENCE_VERSION_MISMATCH','题库或评分版本不匹配');return [];
 }
 const responses=facts.itemResponses;const sums=Object.fromEntries(K68_REPORT_DOMAINS.map(d=>[d,0])) as Record<Domain,number>;
 const seen=new Set<string>();const verified:{prompt:string;raw:number;order:number}[]=[];
 for(const response of responses){
  const q=k68Questions.find(q=>q.id===response.itemId||q.sourceItemId===response.itemId);
  if(!q||q.domain!==response.domain||q.order!==response.displayOrder||seen.has(q.id)||![1,3,5].includes(response.rawValue)){
   issue('P3_EVIDENCE','UNVERIFIED_RESPONSE','逐题记录与冻结题库身份、维度或顺序不符');return [];
  }
  seen.add(q.id);sums[response.domain]+=response.rawValue;verified.push({prompt:q.prompt.zh,raw:response.rawValue,order:response.displayOrder});
 }
 if(seen.size!==30||K68_REPORT_DOMAINS.some(d=>sums[d]!==facts.rawScores[d]||(sums[d]-5)/20*100!==facts.scores[d])){
  issue('P3_EVIDENCE','RESULT_EVIDENCE_INCONSISTENT','真实逐题记录与结果分数不一致');return [];
 }
 return [{type:'table',header:['问卷活动','本次作答记分（1／3／5）'],alignments:[null,'right'],rows:verified.sort((a,b)=>b.raw-a.raw||a.order-b.order).slice(0,3).map(x=>[x.prompt,String(x.raw)])}];
}

/** Only data tokens are interpolated. Professional prose is selected verbatim.
 * Sentences containing sample score/rank frames or a non-applicable third-domain
 * context are omitted as complete source units, never relabelled into another
 * domain. The selected and omitted units remain available for local audit.
 */
function selectSlot(
 raw:SlotSource,slot:SlotId,facts:K68ReportFacts,s:ReturnType<typeof resolveK68ReportSelection>,
 source:string,issue:(slot:string,code:string,reason:string)=>void,
):K68BoundSlot{
 const selected:string[]=[];const omitted:string[]=[];
 const values:Record<string,string>={top1_name:labels[s.top1],top2_name:labels[s.top2],top1_score:String(facts.scores[s.top1]),top2_score:String(facts.scores[s.top2]),gap:String(s.gap),third_priority_sentence:'',tie_expansion_sentence:''};
 const inputs=raw.items??raw.weeks??(raw.text_template?[raw.text_template]:[]);
 for(const input of inputs){
  const inputStart=selected.length;
  const sentences=input.match(/[^。！？]+[。！？]?/g)??[];
  // A source sentence can combine a sample fact clause with approved analysis.
  // Select whole punctuation-delimited clauses; never swap domain semantics.
  const clauses=sentences.flatMap(sentence=>sentence.split(/(?<=[，；])/u));
  for(const original of clauses){
   const unit=original.trim();if(!unit)continue;
   // These two macros are factual rank frames, supplied by the score table.
   // Removing the explicit macro leaves adjacent approved prose untouched.
   const analysisUnit=unit.replace(/\{(?:third_priority_sentence|tie_expansion_sentence)\}/g,'').trim();
   if(!analysisUnit){omitted.push(unit);continue;}
   const sampleFrame=/\d+\s*分|(?:分差|相差|差距)\s*\d+/.test(analysisUnit);
   const thirdContext=/第三|third_|三种|三者/.test(analysisUnit);
   const internal=/G(?:00|10|20|30)|Facet|REAL_EVIDENCE|reference_samples|真实得分、名次及并列关系由/.test(unit);
   if(sampleFrame||thirdContext||internal){omitted.push(unit);continue;}
   let unknown=false;
   const bound=analysisUnit.replace(/\{([a-z0-9_]+)\}/gi,(_,key:string)=>{
    if(!(key in values)){unknown=true;return '';}
    return values[key];
   }).replace(/^(?:本次结果总结|本次兴趣结论)｜/,'').trim();
   if(unknown){issue(slot,'UNKNOWN_DATA_TOKEN','变量包含未定义的数据占位符');omitted.push(unit);continue;}
   if(bound)selected.push(bound);
  }
  const fragments=selected.splice(inputStart);
  if(fragments.length)selected.push(fragments.join(''));
 }
 if(slot!=='P1_RESULT'&&slot!=='P3_EVIDENCE'&&selected.length===0)issue(slot,'APPLICABLE_TEXT_MISSING','排除模拟结果及不适用第三维片段后，没有可用的已认可文本');
 let blocks:Rich[]=selected.length?(raw.items||raw.weeks?[{type:'unordered-list',items:selected}]:selected.map(para)):[];
 if(slot==='P1_RESULT')blocks=[...resultBlocks(facts,s),...blocks];
 if(slot==='P3_PROFILE')blocks=[...s.rankGroups.map(g=>para(g.domains.map(d=>`${labels[d]}${facts.scores[d]}分（${rankLabel(s,d)}）`).join('、'))),...blocks];
 return {blocks,source,selectedText:selected,omittedText:omitted};
}

// Keep every diagnosed context as a required approval gate. TASK9 permits
// only the matching structured reverse variant; absent or invalid variants
// still fail closed with the original diagnostic.
const unsupportedReverseContext:Readonly<Record<string,Readonly<Record<string,string>>>>={
  "01-G20": {
    "P3_RELATION": "把为发现而探索解释为第二兴趣",
    "P4_INTEREST": "把规律游戏作为重心，把自然观察作为第二兴趣",
    "P6_PLAN": "为第二兴趣提供无解题目标活动，仍预设探索居次"
  },
  "01-G30": {
    "P4_INTEREST": "把思考过程称为领先过程，把自然观察称为第二兴趣"
  },
  "02-G10": {
    "P3_RELATION": "用比较方法的持续兴趣解释领先，仍预设思考领先"
  },
  "02-G20": {
    "P3_PROFILE": "思考过程在本次回答中相对更突出",
    "P4_INTEREST": "第二兴趣独立检验指向搭建",
    "P5_ACTIVITY": "区分思考重心和建构兴趣"
  },
  "02-G30": {
    "P3_PROFILE": "问卷显示更集中的思考偏好",
    "P3_RELATION": "优先思考入口并把制作解释为低得分方向",
    "P4_INTEREST": "领先方向多样化指向思考",
    "P5_ACTIVITY": "明显领先的思考偏好",
    "P6_PLAN": "领先的思考偏好"
  },
  "03-G20": {
    "P4_INTEREST": "领先兴趣指向棋类路线策略，第二兴趣指向绘画角色故事"
  },
  "03-G30": {
    "P3_PROFILE": "本次问卷呈现较集中的思考偏好",
    "P4_INTEREST": "领先兴趣多样化指向路线推理和规则变化"
  },
  "04-G20": {
    "P4_INTEREST": "对领先的思考兴趣提供多样化规则游戏"
  },
  "07-G10": {
    "P3_RELATION": "探索的轻微领先"
  },
  "09-G10": {
    "P3_PROFILE": "探索轻微领先"
  },
  "09-G20": {
    "P3_PROFILE": "探索在本次回答中更突出"
  },
  "10-G10": {
    "P5_ACTIVITY": "以不同建构材料检验领先",
    "P7_OBSERVATION": "建构轻微领先"
  },
  "10-G20": {
    "P3_PROFILE": "问卷的重心偏向建构",
    "P5_ACTIVITY": "检验建构重心跨形式存在"
  },
  "10-G30": {
    "P5_ACTIVITY": "以建构材料观察集中偏好"
  },
  "11-G10": {
    "P5_ACTIVITY": "轻微建构领先",
    "P7_OBSERVATION": "建构的轻微领先"
  },
  "12-G20": {
    "P6_PLAN": "第二兴趣指向身体活动"
  },
  "13-G10": {
    "P5_ACTIVITY": "以个人创作验证轻微领先"
  },
  "13-G20": {
    "P5_ACTIVITY": "非创作型合作任务被解释为第二兴趣"
  },
  "14-G20": {
    "P5_ACTIVITY": "身体活动被解释为第二兴趣"
  },
  "15-G20": {
    "P4_INTEREST": "个人路线与节奏活动被解释为第二兴趣"
  }
};

/** Merge already-bound summary content only. Preserve source slot audits and
 * every unique sentence verbatim; never equate similar wording or substrings.
 * Only exact complete sentences repeated across the two slots are suppressed.
 */
function assembleExecutiveSummary(slots:Readonly<Record<SlotId,K68BoundSlot>>){
 const seen=new Map<string,SummarySentenceOrigin>();
 const duplicates:K68SummaryDuplicate[]=[];
 const blocks:Rich[]=[];
 for(const slot of ['P1_RESULT','P1_SUMMARY'] as const){
  slots[slot].blocks.forEach((block,blockIndex)=>{
   if(block.type!=='paragraph'){blocks.push(block);return;}
   const sentences=block.text.match(/[^。！？]*[。！？]+[”’」』"]*|[^。！？]+$/gu)??[];
   const retained:string[]=[];
   sentences.forEach((sentence,sentenceIndex)=>{
    const key=sentence.trim();const origin={slot,blockIndex,sentenceIndex};const prior=seen.get(key);
    if(key&&prior&&prior.slot!==slot){duplicates.push({text:sentence,removed:origin,retained:prior});return;}
    retained.push(sentence);
    if(key&&!prior)seen.set(key,origin);
   });
   if(retained.length===sentences.length){blocks.push(block);return;}
   const text=retained.join('');if(text.trim())blocks.push({...block,text});
  });
 }
 return {blocks,duplicates};
}

export function bindK68Content1020(facts:K68ReportFacts):K68ContentBinding{
 const selection=resolveK68ReportSelection(facts.scores);const key=String(selection.group).padStart(2,'0');
 const fixed=catalog.fixed[key];const variable=catalog.variables[`${key}-${selection.gapCode}`];
 if(!fixed||!variable)throw new Error('K68-1020 asset index incomplete');
 const issues:K68BindingIssue[]=[];
 const issue=(slot:string,code:string,reason:string)=>issues.push({group:selection.group,gapCode:selection.gapCode,slot,code,reason});
 const evidence=verifyEvidence(facts,issue);
 const slots={} as Record<SlotId,K68BoundSlot>;
 for(const slot of K68_1020_SLOT_IDS){
  const source=variable.content.slots[slot];
  if(!source){issue(slot,'SLOT_MISSING','九槽内容缺失');continue;}
  const reverseSlot=selection.group===1?'P3_PROFILE':'P1_SUMMARY';
  const contextReason=unsupportedReverseContext[`${key}-${selection.gapCode}`]?.[slot];
  if(selection.reversed&&(slot===reverseSlot||contextReason)){
   const approved=source.reverse_top1;
   const expectedApproval=contextReason?'K68-1020-TASK9':'K68-1020-TASK6';
   const field=source.items?'items':source.weeks?'weeks':'text_template';
   const prose=approved?.[field];
   const selected=typeof prose==='string'?[prose]:prose;
   if(!approved||approved.leading_domain!==selection.top1||approved.secondary_domain!==selection.top2||
      approved.approval!==expectedApproval||!selected?.length||
      selected.some(t=>typeof t!=='string'||!t.trim()||/\{|\}|reference_samples|REAL_EVIDENCE|\bG(?:00|10|20|30)\b/.test(t))||
      (field!=='text_template'&&(!Array.isArray(prose)||prose.length!==source[field]?.length))){
    issue(slot,contextReason?'UNAPPROVED_REVERSE_CONTEXT':'DIRECTION_TEXT_MISSING',contextReason??'缺少与实际领先方向匹配的已批准文本');continue;
   }
   // Preserve all approved sentences/list items in the existing chapter.
   // Scores and actual gap remain in P1_RESULT, avoiding duplicate introductions.
   const blocks:Rich[]=field==='text_template'?selected.map(para):[{type:'unordered-list',items:[...selected]}];
   slots[slot]={blocks,source:variable.source_path,selectedText:selected,omittedText:[]};
   continue;
  }
  if(selection.reversed&&slot==='P1_RESULT'){
   // This source repeats the forward summary. Keep this slot factual; the
   // direction-specific approved interpretation belongs in P1_SUMMARY.
   slots[slot]={blocks:resultBlocks(facts,selection),source:variable.source_path,selectedText:[],omittedText:source.text_template?[source.text_template]:[]};continue;
  }
  slots[slot]=slot==='P3_EVIDENCE'?{blocks:evidence,source:variable.source_path,selectedText:[],omittedText:[]}:selectSlot(source,slot,facts,selection,variable.source_path,issue);
 }
 if(issues.length)throw new K68ContentBindingError(issues);
 const primary=[selection.top1,selection.top2];
 const third=selection.thirdDomains.filter(d=>!primary.includes(d));
 const contextual=third.flatMap(d=>[rankedHeading(facts,selection,d),...card(d)]);
 const contextualMaps=third.flatMap(d=>donorMap(d));
 const firstHeading=fixed.blocks.findIndex(b=>b.kind==='paragraph'&&b.text.startsWith('01.'));
 const identity=fixed.blocks.slice(0,firstHeading).filter(b=>{
  const t=text(b);return !t.includes('{{')&&!t.includes('本次结果关注')&&!t.includes('本次测试分析结果');
 });
 const development=section(fixed,3);
 const mapStart=development.findIndex(b=>b.kind==='paragraph'&&b.text.includes('兴趣发展地图'));
 const value=development.find(b=>b.kind==='table'&&text(b).includes('兴趣不必最后变成职业'));
 const hobby=[...rich(development.slice(0,mapStart)),...primary.flatMap(d=>rich(mapBlocks(fixed,d))),...(value?rich([value]):[])];
 const activity=section(fixed,4);const cardStart=activity.findIndex(b=>b.kind==='paragraph'&&b.text.startsWith('活动卡 A'));
 if(cardStart<0)throw new Error('Missing fixed activity cards');
 const activityTable=activity.find(b=>b.kind==='table');
 const pairTable:SourceBlock[]=activityTable?.kind==='table'?[{kind:'table',rows:activityTable.rows.slice(0,4)}]:[];
 const approvedCandidate=selection.group===15&&selection.top1==='connect'&&selection.top2==='move'&&selection.gap===20;
 const approvedPairTable=approvedCandidate?pairTable.map(block=>{
  if(block.kind!=='table')return block;
  return {...block,rows:block.rows.map((row,index)=>{
   if(index!==1&&index!==2)return row;
   const first=row[0];
   if(!first)return row;
   const name=index===1?'当前领先兴趣':'第二兴趣独立体验';
   return [{blocks:[{kind:'paragraph' as const,text:name}]},...row.slice(1)];
  })};
 }):pairTable;
 const approvedActivityExtras=approvedCandidate
  ? slots.P5_ACTIVITY.blocks.filter(block=>{
     if(block.type!=='unordered-list')return true;
     return block.items.some(item=>!/^活动[AB]｜/.test(item));
    }).map(block=>{
     if(block.type!=='unordered-list')return block;
     return {...block,items:block.items.filter(item=>!/^活动[AB]｜/.test(item))};
    })
  : slots.P5_ACTIVITY.blocks;
 const parent=section(fixed,5);
 // Group01's legacy first-week row names a sample third domain. Reuse the
 // approved generic row from the same package instead of relabelling its prose.
 const genericPlan=section(catalog.fixed['15'],5).find(b=>b.kind==='table'&&text(b).includes('第 1–2 周'));
 const boundParent=parent.flatMap((b):SourceBlock[]=>{
  if(b.kind==='table'&&text(b).includes('第 1–2 周')&&/思考、探索及动手建构/.test(text(b)))return genericPlan?[genericPlan]:[];
  return [b];
 });
 // Candidate revision approved by the user on 2026-10-21; not a fingerprint freeze.
 // Scope: Group15 forward, actual gap 20 only. Source slots remain immutable.
 // Section07 excerpts: frozen connect-move-combination-pack-v1.md,
 // Combination Summary Fragment (ZH) and C03 (ZH).

 const candidateProfile=approvedCandidate?[
  ...slots.P3_PROFILE.selectedText.map(para),
  para('本次回答中，连接兴趣比行动兴趣更突出。两者的区别在于：连接关注和谁一起参与、怎样共同完成；行动关注身体移动和活动过程。后续可分别提供安静合作和个人运动体验，观察孩子对两种过程的选择。'),
 ]:slots.P3_PROFILE.blocks;
 // All 30 responses have passed verifyEvidence above. Cover both leading
 // domains before selecting one additional strongest response; order breaks ties.
 const leadingResponses=approvedCandidate?facts.itemResponses
  .filter(response=>primary.includes(response.domain))
  .slice().sort((a,b)=>b.rawValue-a.rawValue||a.displayOrder-b.displayOrder):[];
 const representatives=approvedCandidate?primary.map(domain=>leadingResponses.find(response=>response.domain===domain)!):[];
 if(approvedCandidate){
  const additional=leadingResponses.find(response=>!representatives.includes(response));
  if(additional)representatives.push(additional);
 }
 const candidateEvidence:readonly Rich[]=approvedCandidate?[
  {type:'table',header:['问卷活动','所属兴趣领域','本次作答（原始记分）'],alignments:[null,null,'right'],rows:representatives.map(response=>{
   const question=k68Questions.find(q=>q.id===response.itemId||q.sourceItemId===response.itemId);
   const label=KIDS_RESPONSE_CONTRACTS.k68.options.find(option=>option.value===response.rawValue)?.label.zh;
   if(!question||!label)throw new Error('Missing verified K68 question or response label');
   return [question.prompt.zh,labels[response.domain],`${label}（${response.rawValue}）`];
  })},
  para('这些回答记录的是尝试意愿，是否持续喜欢仍需结合实际体验观察'),
 ]:slots.P3_EVIDENCE.blocks;
 // Keep the approved concrete comparison; omit the two generic introductions.
 const candidateRelation=slots.P3_RELATION.blocks;
 const executiveSummary=assembleExecutiveSummary(slots);
 const sections:K68ContentBinding['sections']=[
  // 01. Six-domain professional foundation
  {id:'six-domain-interest-map',blocks:rich(section(fixed,1))},

  // 02. Actual interest results, evidence and relationship
  {id:'current-interest-pattern',blocks:[
   ...executiveSummary.blocks,
   ...candidateProfile,
   ...primary.flatMap(d=>profile(fixed,d,facts,selection)),
   ...contextual,
   ...candidateEvidence,
   ...candidateRelation,
  ]},

  // 03. Approved interest development pathways
  {id:'what-to-explore-next',blocks:[
   ...hobby,
   ...contextualMaps,
   ...slots.P4_INTEREST.blocks,
  ]},

  // 04. Approved activities and exploration entry points
  {id:'exploration-environment',blocks:[
   ...rich(approvedPairTable),
   ...rich(activity.slice(cardStart)),
   ...approvedActivityExtras,
  ]},

  // 05. Parent support and personalized action
  {id:'parent-observation-plan',blocks:[
   ...rich(boundParent),
   ...slots.P6_PLAN.blocks.map(block=>{
    if(!approvedCandidate || third.includes('discover') ||
       block.type!=='unordered-list')return block;
    return {...block,items:block.items.filter(item=>
      item!=='探索兴趣继续用观察变化的活动开放')};
   }).filter(block=>block.type!=='unordered-list'||block.items.length>0),
  ]},

  // 06. Interest formation and personalized observation
  {id:'broader-interest-context',blocks:[
   ...rich(section(fixed,6)),
   ...slots.P7_OBSERVATION.blocks,
  ]},

  // 07. Methodology and interpretation boundaries
  {id:'methodology-and-boundaries',blocks:rich(section(fixed,7))},

  // 08. Approved professional references
  {id:'report-identity',blocks:rich(section(fixed,8))},
 ];

 if(sections.some(s=>!s.blocks.length))throw new Error('K68-1020 empty report section');
 const visible=JSON.stringify(sections);
 if(/\{\{|\{(?:top1|top2|third|gap|tie_)|reference_samples|K68_30_|REAL_EVIDENCE/.test(visible))throw new Error('K68-1020 unresolved data binding');
 return {version:'K68-1020',selection,slots,sections:sections.map((entry,index)=>{
  const number=String(index+1).padStart(2,'0');
  const chapter=fixed.blocks.find(block=>
   block.kind==='paragraph'&&block.text.startsWith(`${number}.`)
  );
  if(!chapter||chapter.kind!=='paragraph')
   throw new Error(`Missing K68-1020 title ${number}`);
  const titleZh=chapter.text.replace(/^\d{2}\.\s*/,'').trim();
  if(!titleZh)throw new Error(`Empty K68-1020 title ${number}`);
  return {...entry,titleZh};
 }),executiveSummaryDuplicates:executiveSummary.duplicates,source:{path:fixed.source_path,sha256:fixed.sha256},evidence:'verified-question-responses-only'};
}

/** Serialize existing rich blocks for generator compatibility, not for selection. */
export function k68BoundMarkdown(blocks:readonly Rich[]):string{
 const cell=(t:string)=>t.replace(/\|/g,'／').replace(/\n/g,' ');
 return blocks.map(b=>{
  switch(b.type){
   case 'heading':return `${'#'.repeat(b.level)} ${b.text}`;
   case 'paragraph':return b.text;
   case 'unordered-list':return b.items.map(t=>`- ${t}`).join('\n');
   case 'ordered-list':return b.items.map((t,i)=>`${i+1}. ${t}`).join('\n');
   case 'blockquote':return `> ${b.text}`;
   case 'divider':return '---';
   case 'table':return ['| '+b.header.map(cell).join(' | ')+' |','| '+b.header.map(()=> '---').join(' | ')+' |',...b.rows.map(row=>'| '+row.map(cell).join(' | ')+' |')].join('\n');
  }
 }).join('\n\n');
}

export function getK68ApprovedDomainAssets():Record<Domain,{sourcePath:string;sha256:string;markdown:string}>{
 const source=catalog.fixed['01'];
 return Object.fromEntries(K68_REPORT_DOMAINS.map(domain=>[domain,{sourcePath:source.source_path,sha256:source.sha256,markdown:k68BoundMarkdown(card(domain))}])) as Record<Domain,{sourcePath:string;sha256:string;markdown:string}>;
}
