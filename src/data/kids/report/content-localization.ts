import englishContent from './fixed-assets/k68-1020-en.json';
import {k68Questions} from '../questions/k68';
import {KIDS_RESPONSE_CONTRACTS} from '../schema';
import type {FixedReportRichBlock} from '@/data/report/fixed-assets/fixed-report-rich-content';

// Controlled English counterparts of the already selected K68-1020 content.
// Selection, score calculation, evidence validation and the Chinese output stay
// in their existing pipeline. There is no translation service or locale state.
const content:Readonly<Record<string,string>>=englishContent;
const domains:Readonly<Record<string,string>>={思考:'Think',探索:'Discover',建构:'Build',创造:'Create',连接:'Connect',行动:'Move'};
const questionText=new Map<string,string>(k68Questions.map(question=>[question.prompt.zh,question.prompt.en]));
const responseText=new Map<string,string>(KIDS_RESPONSE_CONTRACTS.k68.options.map(option=>[option.label.zh,option.label.en]));
const han=/\p{Script=Han}/u;

/** Factual fields are handled independently of sample values and tie size. */
function factualText(text:string):string|undefined {
 const domain=domains[text];if(domain)return domain;
 const question=questionText.get(text);if(question)return question;
 const answer=responseText.get(text);if(answer)return answer;
 let match=text.match(/^(并列)?第(\d+)名$/);
 if(match)return `${match[1]?'Joint rank':'Rank'} ${match[2]}`;
 match=text.match(/^(\d+)分$/);if(match)return `${match[1]} points`;
 match=text.match(/^(思考|探索|建构|创造|连接|行动) (Think|Discover|Build|Create|Connect|Move)$/);
 if(match)return domains[match[1]];
 match=text.match(/^(思考|探索|建构|创造|连接|行动) (Think|Discover|Build|Create|Connect|Move)｜(\d+)分 · ((?:并列)?第\d+名)$/);
 if(match)return `${domains[match[1]]} | ${match[3]} points · ${factualText(match[4])}`;
 const ranks=text.split('、').map(part=>part.match(/^(思考|探索|建构|创造|连接|行动)(\d+)分（((?:并列)?第\d+名)）$/));
 if(ranks.every(rank=>rank!==null))return ranks.map(rank=>`${domains[rank![1]]}: ${rank![2]} points (${factualText(rank![3])})`).join('; ');
 match=text.match(/^(不太想试试|还不确定|很想试试)（([135])）$/);
 if(match)return `${responseText.get(match[1])} (${match[2]})`;
 return undefined;
}

export function localizeK68Text(text:string,locale:'zh'|'en'):string {
 if(locale==='zh'||!han.test(text))return text;
 const factual=factualText(text);if(factual!==undefined)return factual;
 // Numeric slots bind current report values, including gaps above 30 and
 // changed ranks. They are never supplied by a stored sample translation.
 const values:string[]=[];
 const key=text.replace(/\d+/g,value=>{values.push(value);return `{n${values.length-1}}`;});
 const template=content[key];
 if(template===undefined)throw new Error(`K68-1020 missing English content: ${key}`);
 const used=new Set<number>();
 const translated=template.replace(/\{n(\d+)\}/g,(_,index:string)=>{
  const i=Number(index);if(values[i]===undefined)throw new Error('K68-1020 invalid English data slot');
  used.add(i);return values[i];
 });
 if(used.size!==values.length||han.test(translated)||/\{n\d+\}/.test(translated))throw new Error('K68-1020 invalid English content');
 return translated;
}

export function localizeK68Blocks(blocks:readonly FixedReportRichBlock[],locale:'zh'|'en'):readonly FixedReportRichBlock[]{
 if(locale==='zh')return blocks;
 const translate=(text:string)=>localizeK68Text(text,locale);
 return blocks.map(block=>{
  switch(block.type){
   case 'paragraph':case 'heading':case 'blockquote':return {...block,text:translate(block.text)};
   case 'ordered-list':case 'unordered-list':return {...block,items:block.items.map(translate)};
   case 'table':return {...block,header:block.header.map(translate),rows:block.rows.map(row=>row.map(translate))};
   case 'divider':return block;
  }
 });
}
