import {localizeK68Blocks,localizeK68Text} from '../src/data/kids/report/content-localization';
import type {FixedReportRichBlock} from '../src/data/report/fixed-assets/fixed-report-rich-content';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {LocaleProvider} from '../src/components/locale';
import {K68ProfessionalReportDocument} from '../src/app/kids/report/[sessionId]/professional-report-document';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {buildK68ReportFacts} from '../src/data/kids/report/facts';
import {generateK68ProfessionalReport} from '../src/data/kids/report/generator';
import {assembleK68ReportSections} from '../src/data/kids/report/assembly';
import {k68Questions} from '../src/data/kids/questions/k68';
const domains=['think','discover','build','create','connect','move'] as const;
const pairs=domains.flatMap((a,i)=>domains.slice(i+1).map(b=>[a,b]));
const golden:Record<string,string>={"1-0-false":"0ba1977953067fddc9dbca2f6f105afa67552e4a4313d43410c6e7c194968296","1-10-false":"8c5a39dfbaa26c24aa9052a357cfaaa7d4dbeb713e86554d77d9bb16aac4d444","1-10-true":"c3f2a7d3f7481c43c9710bce5e57f62db82c303416e4bf38d00eeeae19e119cf","1-20-false":"5793d5b68475bd4a38574ee3dc837a55f68338bea9e6b6d7201e926e5223c5ac","1-20-true":"f9e9c09b3557b09056b5dcd0a69284ac25eecdc2dc466ef7d09643fb44c2f583","1-40-false":"2c63b09c025f3c30307a6ceb2f196b6fda3599db14fdaab04f1762ddc08b5d61","1-40-true":"a0236e08b4e7664bf378e6baeaadbf1b0992366296b258f8e5dd8219af73a8da","2-0-false":"ee87b5fa57725e675f384c0e08bcffd963cbfca0a195609fb5fdc78740069233","2-10-false":"a212ca14dbefd42ac37117b0848e2c74da07397b55de7dfbbd0ae357ffd7dcbe","2-10-true":"fc42235e0c52f587ecc4e7aea71ea20044410bcef6b4decbd17c1a73f4a03d65","2-20-false":"3a252e17bfe2865cbbfe96b0c0f19032b2b2cbdc7c7f783519e3ed753ec8fafe","2-20-true":"b9d30f5ff6519d4951f1cee593f70f6fd629a7a58c849a4e9a10984ca4b2bbcc","2-40-false":"b32f5e9bbe3fa848c221c6b2d6295fce67bb09fa35719ccb4ba6d338f0fd65aa","2-40-true":"014550a3984eff96e854eb453168b40347a96f9270396bc4968bd096330ddebe","3-0-false":"69600ea2eb27dfb464a508f8f583dcc7e6ebfdce6a1a0e6e34f69fc646328f28","3-10-false":"67c5e75f71761639aeacc362e74fc4d7352b2c1386523add3cafab9ca48c46ce","3-10-true":"0d39994abb96dcea2d5fde20856f7aaed1718ee6ec9ad06020e9a6f45ef907bd","3-20-false":"758adaa3bb94694fd4fcd67290169c75ee064824ceca6d6215274151854d940f","3-20-true":"ff901beceef3965e2178fd418c5de2befcf7e05bd16a83e934c94210da6afdb8","3-40-false":"a9388d187627b7568e200b10a1a5844be6ea65ce8da5e9bd9fa69c248cac953f","3-40-true":"76b6995c523ff7cf1a8b08c51bfbbe90c3a82c4b2cca04c43dffb7c2261abb58","4-0-false":"78ea95d5ff51219580ccca8a73910406bd412c0cd44f039ac2fae1947a79c0b1","4-10-false":"51101649d04a4be6fa295592e2877a32e088e788a1e6a69914f39680286428bb","4-10-true":"762880e8c0e9fca3f82a715e7ac2d74249add9a9184a17d08501a2e6f68db139","4-20-false":"b5fc612455ceae7366e7c38f00565f2140ffc7b1ed19c76b187ac1497a245c74","4-20-true":"04ee59278ba1ec7064da0839c62e6a42ed4c1945f63caec215f5158ff0ab821c","4-40-false":"af50d75bcfbae98a613ea9983b5bfb6b67161ea29b8741ac904ec14ed1d3a0a1","4-40-true":"b9ea6bdd5e4421e9d9cce17a8565284728e68c4e68c28b6db6ea1c35c636e80a","5-0-false":"b5420a55569656d3987257b4cc1d47f309d688704bc8557aa5c9f04b36ca361e","5-10-false":"2f24d61ddc240758c0f737f65ea4f0c2b511d2e20a57783cdaafcb4eb796541e","5-10-true":"dfc0148c4dabc0ca14227d1090d1e7b61a1979050f780b6175c0fc7aed8508e4","5-20-false":"25b7bb30f2be462d0e8a4487e5239a36919122224bd4ce758191956632e8795d","5-20-true":"df09ec6aadb8277ad8c07d4238d3a6c97a3b5fd0ad5552838c412a61a0985a87","5-40-false":"b71e48a207895bb8fb8fbe87bfe9148d72eb2f8936bb8240d2b71fdf604c9c46","5-40-true":"4eb9b15003587e2eb318a427b8eb9693d56dd43bb01441cc92343c5f89446ee1","6-0-false":"a4c70f549fb4253a4b3f5ed9258de9fe643673836392fe9282f6dff0d31e46ef","6-10-false":"79d89d18247cf2028c09d3df4b445577783c77f522601b5b52eda3c0df905070","6-10-true":"f79e5cde0cad584e4a82dff59b139fbf69e3d722b2a4e82a11a0a72b3ecfcffa","6-20-false":"e5c8bc8a605dd4a342c0b5395b3ba5593b2f6cdbebcdfcf7ff8ebd49ebf2b0fa","6-20-true":"bdb1091760d06cc71e77c3ef7876b48fa768bd1302b7a003716888799135a6da","6-40-false":"29b7e8e5cdf1762e94f10dd5cd5d93dd20c028b4c4ceb42704d10058e6e57962","6-40-true":"6364355727acf3bac266cbdf82a746a513671e24e6b1fb2606b2990d78e12933","7-0-false":"642c17d8bcad3f21f55e7824ace76cc87895f049a1c0a5e4b03d2b2b9edd4b1d","7-10-false":"43d1f2f3afaab4c02e062fce28d9605e9f5351b0fc923afde2743d2a7cffc404","7-10-true":"331164203e67f0101b6189ec32ddcda5d8bfb874d89f3b776342127d37cc71d7","7-20-false":"71230a81cb0f92d20ad747ff711711d5e1f8f38b2c15a607b75815e79cc65cab","7-20-true":"7517f74fb3cfcee83eeddf6ce32c41af575a3d4d56aa015ccc9f585604ee2dae","7-40-false":"61a99fb503370369c40ccf186bb18375ef1aec839ae9d7c14dcf8d0b0738cd2a","7-40-true":"b12589b8051c33ae5c8b2a9b3dc5aeda8a5555359d2ce0da4d1b30e3d4b48419","8-0-false":"6b8f709f7ca4da62f8b905216b4231e910d0d80a8ae170f1403a2f26614850d6","8-10-false":"c8596e0bb5d016bff7e2113a7f2f20ceb433e44a7de74acfc660a59519595159","8-10-true":"73c2056eaa3347a61d111bac37d006e10c687862bb9007aaeab9c6a81b7872ce","8-20-false":"587b0fb4b67c709ed2c34cb4355591210c517bf798b5f17676f0e0c366f10764","8-20-true":"34f7c3ace790fc1260e11b7340de080082277c38ae87c7142d37f9049b549320","8-40-false":"d53cc9867f456892b4cf897670c32f3f1d284e2d1a613e3de3d059ea99c18995","8-40-true":"2204e741d4188654b0b8b6cc339db8291b910aff087a3ed4a273bb36f1c5e3e5","9-0-false":"551f5277556d4e3a0a7f594fff72b02c2ec12a9cd72477f0b3a4846bd80de611","9-10-false":"c13df4b6caa8da475e91b6d0a08cfcf924301fd944860b4b21fdcfe52a002f43","9-10-true":"13295f481dd17202635358d87c35d9729b458d6f9f0ddc927b1c3f14324c43d4","9-20-false":"736e7b6e57be84efb673e113d5d180e8a3fca05f57e2ca93a1918ea05b388cd0","9-20-true":"af2467b58836a1713d83d493593a7f30e4e1cbf8170f4eae67973bac9fe74244","9-40-false":"7054c8403557f325712e73448c88ebaf8f1e3b4401405cd4a81d13afc1889d7f","9-40-true":"649c0d941294d16a69d98064696bb95d35f6a3501a5d3728f1246b2617486419","10-0-false":"c99d9c20f5563aed4302c146abba004db0fbc962abdd38184dd0348568f14627","10-10-false":"506e8606b22cac5da86ecf2783c218e0b705a6684bdc2387738d1545cb18518a","10-10-true":"c12d92ba11137090f366ff0839314849f665becf0e7c58a5843f4156da833807","10-20-false":"e174d60c0b151f7afe070592a9d15593233111fa6c7608efcc93dc88401782a7","10-20-true":"9da626bdf7d3bcee40c668b9a0731f381a42830bb0f313c85d6c29c1c9153396","10-40-false":"41221015183ac311ff427df2e00109c07527b9978a33f281ed3e5ee61742e3b1","10-40-true":"b992c48be07727ea007b046fcb4f3ab1b652b7fe4c5d94f39c063c09e171c7e6","11-0-false":"73fbb0b0a5c2d8412e2d1100a8a3d2a10bca83badb424b975af36aaa7ce88087","11-10-false":"42ba9ec4009a9fd2ad3d3af2ba0b61e67a5112274ce80904f0d288ffbe75a446","11-10-true":"bad4aa0e00933ecde2bf2c726bececb7384af772e52c82bdd0f00cd078631472","11-20-false":"fb1abd1d8e8df8e88d2978936823e606e7d444868687c3220fcba66f31ea7123","11-20-true":"38f82f35851294d91a57302a73e2c62e6ed21f495190d6062cb0b06247310620","11-40-false":"aecce31c077ebeca85c6f7e670fa9f6e7258615fbf2c9c98dd68ecffe2bfe542","11-40-true":"5697b6183810687183c963c2bbf81e5760abe769d6d49bce0988f70bd472c00e","12-0-false":"539447abcebf8fdc34e7ff51fddd77119409cc437e64edd2c74a73cb3d637462","12-10-false":"6da8270b2bf2b5fdbc49b428f0981d1929224ec1899e0e3d3158d797a9b75e2a","12-10-true":"708f3ea7a99a24fcadf7498aeeb5028c0b4a73d3b1e9849398e2dbbee0994d6c","12-20-false":"f8ed65345b8defa9dd962a2e5ba8d161ae7a0f8019a9675c0ec8d11aee2ffc50","12-20-true":"df328c4ef8a651fb9491d64665954a5b2ef3124dd58f63b69ddf8e95b067e05c","12-40-false":"5fc139c0123f002d4a5f3d6a63ebac59f9d9695795ec4f4e520c1fd2c0538ff1","12-40-true":"dfc7536256fbd3d71aa91f4a29fab01af67574145760f3f2ecc8587b6f81ad25","13-0-false":"fdc2160dfe553b881a8e2286215d52efcdfccaa5a3f2dee9e8648d633b31a39a","13-10-false":"7c5b6f92c87707a6505e090478eb3f6fc993ed2e21134af4bbd9bc9b2182c8ec","13-10-true":"2314ec5682313b766e1c5a7596c70ef45e77ae8a4c5171bca935dc2586f3c7c8","13-20-false":"2f1aa3fe92f4aec514710ac73f6bbf83c3d130f490a40d7c2a71766c8096c125","13-20-true":"32b75b624e9ea5ac606acd2f86bfa8eaf57b761896e9ea4f387152480ffba0fc","13-40-false":"0f45ca3cc56bbdbfbf3e5a298a7c597a19c2fbf63c31fa25d428ca046ff9d62e","13-40-true":"06f6467c363e8185d81ee1fb10ed3c98d079a7527d8f2235a777b6177ad8aac7","14-0-false":"682748fc710cd6701ca6a56c2e204520f3813ae5e7769483adfc1c41250c76a8","14-10-false":"8c503b83b1e742171f68b6c7531e89942d5c6bb4789e3ba1a49411153ff8297e","14-10-true":"a55b4fb62dfe642ebe28a94b78fd773479d47e5d9989b7b9ed8608dd10b278fd","14-20-false":"dcb362ee470773ec088951282f97490171574f5a20fddf275d2c8bcddc247c32","14-20-true":"4cbca54abef5c6db44222dfcc3ff1bb4ba00103a6a11e5c2d3ef7826ed9e17d2","14-40-false":"0fa1ef7c6827978170cc747fd4cc2f82479f446fd98bdef30fcf6e41cde7b402","14-40-true":"9d14f43536b57407d3011101909deb11ae034b879af139c2c7253d6f8608853a","15-0-false":"aad8268772351b177ffa0d9d563251f4a52c720ca4a73d325f03ddfb2dfd9b48","15-10-false":"f46960fdb06145b791a0456a7cf8ecd24004736810bb2c9f0752559787a2c82d","15-10-true":"c0c9ff6f8800785bceaa187bf442adb285cd77a79114e26d8bb99c0b8aeeb918","15-20-false":"98965091f1675de908399b65c356643d56e8483680da9d42d1ed17855e84f275","15-20-true":"f72781c5ff4da26206a4f3b80abd2353c94245a19f89e6fbb35fcee68272f4c8","15-40-false":"99b5003d868346281917bea01f263abdd21da7175d27e12874de9517c2b481fa","15-40-true":"13a3146a0c673fcd6f27c7b66581e3618469eb317ba73352bdbfc45626fbcf85"};
let checked=0;
for(const [index,pair] of pairs.entries())for(const gap of [0,10,20,40])for(const reversed of gap?[false,true]:[false]){
 const scores=Object.fromEntries(domains.map(d=>[d,0])) as Record<(typeof domains)[number],number>;domains.filter(d=>!pair.includes(d)).forEach((d,i)=>scores[d]=40-i*10);
 scores[pair[reversed?1:0]]=90;scores[pair[reversed?0:1]]=90-gap;
 const remaining=Object.fromEntries(domains.map(d=>[d,scores[d]/10]));
 const facts=buildK68ReportFacts({resultId:'bilingual-test',sessionId:'bilingual-test',module:'kids',status:'completed',ageForm:'K68',questionBankVersion:'KIDS-K68-RF-V2',releaseFormVersion:'KIDS-K68-RF-V2',scoringVersion:'KIDS-SCORING-V2',patternType:'ignored',leadingCluster:[],highlightedDomains:[],domainResults:domains.map(domainId=>({domainId,rawScore:5+scores[domainId]/5,normalisedScore:scores[domainId]})),itemResponses:k68Questions.map(q=>{const steps=Math.min(2,remaining[q.domain]);remaining[q.domain]-=steps;return {itemId:q.sourceItemId,domain:q.domain,displayOrder:q.order,rawValue:1+2*steps};})} as Parameters<typeof buildK68ReportFacts>[0]);
 const report=generateK68ProfessionalReport(facts,{contentVersion:'K68-1020'});

 const id=`${index+1}-${gap}-${reversed}`;
 const before=JSON.stringify(report);
 const zh=assembleK68ReportSections(report,'zh');
 const en=assembleK68ReportSections(report,'en');
 assert.equal(zh.length,8,id+' Chinese chapters');
 assert.equal(en.length,8,id+' English chapters');
 assert.equal(createHash('sha256').update(JSON.stringify(zh)).digest('hex'),golden[id],id+' Chinese baseline changed');
 assert.deepEqual(en.map(s=>s.id),zh.map(s=>s.id));
 assert.ok(!/\p{Script=Han}/u.test(JSON.stringify(en)),id+' English contains untranslated Chinese');
 assert.equal(JSON.stringify(report),before,id+' language assembly mutated business data');
 checkLocalized(report);
 checked++;
}
console.log('BILINGUAL_SCENARIOS='+checked+'; CHAPTERS=8; ZH_BASELINE=PASS; EN_HAN_FREE=PASS; SESSION_DATA=UNCHANGED');

// Additional coverage uses the same frozen question and result contracts; no
// alternate scoring or locale state is introduced by the report tests.
function makeReport(scores:Record<(typeof domains)[number],number>, reverseResponses=false){
 const remaining=Object.fromEntries(domains.map(d=>[d,scores[d]/10]));
 const responses=[...k68Questions];if(reverseResponses)responses.reverse();
 const itemResponses=responses.map(q=>{const steps=Math.min(2,remaining[q.domain]);remaining[q.domain]-=steps;return {itemId:q.sourceItemId,domain:q.domain,displayOrder:q.order,rawValue:1+2*steps};});
 const result={resultId:'bilingual-extra',sessionId:'same-session',module:'kids',status:'completed',ageForm:'K68',questionBankVersion:'KIDS-K68-RF-V2',releaseFormVersion:'KIDS-K68-RF-V2',scoringVersion:'KIDS-SCORING-V2',patternType:'ignored',leadingCluster:[],highlightedDomains:[],domainResults:domains.map(domainId=>({domainId,rawScore:5+scores[domainId]/5,normalisedScore:scores[domainId]})),itemResponses} as Parameters<typeof buildK68ReportFacts>[0];
 return {result,report:generateK68ProfessionalReport(buildK68ReportFacts(result),{contentVersion:'K68-1020'})};
}
function shape(block:FixedReportRichBlock):unknown{
 switch(block.type){
  case 'table':return [block.type,block.header.length,block.rows.map(row=>row.length),block.alignments];
  case 'ordered-list':case 'unordered-list':return [block.type,block.items.length];
  case 'heading':return [block.type,block.level];
  default:return block.type;
 }
}
function checkLocalized(report:ReturnType<typeof generateK68ProfessionalReport>){
 const before=JSON.stringify(report);
 const zh=assembleK68ReportSections(report,'zh'),en=assembleK68ReportSections(report,'en');
 assert.equal(zh.length,8);assert.equal(en.length,8);
 assert.deepEqual(en.map(s=>s.blocks.map(shape)),zh.map(s=>s.blocks.map(shape)),'No missing blocks, advice, list entries or table cells');
 assert.ok(!/\p{Script=Han}/u.test(JSON.stringify(en)));
 assert.equal(Object.keys(report.contentBinding!.slots).length,9);
 for(const slot of Object.values(report.contentBinding!.slots)){
  const translated=localizeK68Blocks(slot.blocks,'en');
  assert.ok(!/\p{Script=Han}/u.test(JSON.stringify(translated)));
  assert.deepEqual(translated.map(shape),slot.blocks.map(shape));
 }
 for(const section of report.contentBinding!.sections){
  const title=localizeK68Text(section.titleZh!,'en');
  assert.ok(title.length>0&&!/\p{Script=Han}/u.test(title));
 }
 assert.deepEqual(assembleK68ReportSections(report,'zh'),zh,'Switching back must preserve Chinese');
 assert.equal(JSON.stringify(report),before,'Switching language must not mutate session data');
}
let topTies=0,secondTies=0,thirdCases=0,extraGaps=0;
for(let mask=1;mask<64;mask++){
 const selected=domains.filter((_,i)=>mask&(1<<i));if(selected.length<2)continue;
 const scores=Object.fromEntries(domains.map((d,i)=>[d,selected.includes(d)?80:30-i*5])) as Record<(typeof domains)[number],number>;
 // Scores must remain on the frozen ten-point lattice.
 domains.forEach(d=>scores[d]=Math.floor(scores[d]/10)*10);
 checkLocalized(makeReport(scores).report);topTies++;
}
for(const top of domains){
 const others=domains.filter(d=>d!==top);
 for(let mask=1;mask<32;mask++){
  const selected=others.filter((_,i)=>mask&(1<<i));if(selected.length<2)continue;
  const scores=Object.fromEntries(domains.map(d=>[d,d===top?90:selected.includes(d)?70:20])) as Record<(typeof domains)[number],number>;
  checkLocalized(makeReport(scores).report);secondTies++;
 }
}
for(const third of domains){
 const pair=domains.filter(d=>d!==third).slice(0,2);
 const scores=Object.fromEntries(domains.map(d=>[d,d===pair[0]?90:d===pair[1]?70:d===third?60:10])) as Record<(typeof domains)[number],number>;
 checkLocalized(makeReport(scores,true).report);thirdCases++;
}
for(const pair of pairs)for(const gap of [30,50,60,70,80])for(const reverse of [false,true]){
 const scores=Object.fromEntries(domains.map(d=>[d,0])) as Record<(typeof domains)[number],number>;
 scores[pair[reverse?1:0]]=100;scores[pair[reverse?0:1]]=100-gap;
 checkLocalized(makeReport(scores,true).report);extraGaps++;
}
for(const level of [0,50,100])checkLocalized(makeReport(Object.fromEntries(domains.map(d=>[d,level])) as Record<(typeof domains)[number],number>).report);
assert.throws(()=>localizeK68Text('未受控的新增报告内容','en'),/missing English content/,'Missing translation must fail, not fall back');
const sample=makeReport({think:50,discover:40,build:30,create:20,connect:90,move:70});
const corrupted={...sample.result,itemResponses:sample.report.itemResponses.slice(1)};
assert.throws(()=>generateK68ProfessionalReport(buildK68ReportFacts(corrupted),{contentVersion:'K68-1020'}),'Missing evidence must still fail');
const html=renderToStaticMarkup(createElement(LocaleProvider,null,createElement(K68ProfessionalReportDocument,{report:sample.report})));
assert.ok(!/\p{Script=Han}/u.test(html),'English page, TOC and body must be free of Chinese');
assert.ok(html.includes('This report contains 8 sections'));
assert.equal((html.match(/Professional Interpretation/g)||[]).length,8);
console.log(`TOP_TIES=${topTies}; SECOND_TIES=${secondTies}; THIRD_DOMAINS=${thirdCases}; ADDITIONAL_GAPS=${extraGaps}; NINE_SLOTS=PASS; HTML_EN=PASS; MISSING_TRANSLATION_FAILS=PASS; EVIDENCE_GUARD=PASS`);
