import { Component, OnInit,AfterViewInit, OnDestroy, Input, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ControlModel, WritingTestResultAttemptModel, WritingResultModel , MatchModel, SubAttemptModel, WritingPracticeModel, ToneModel, SentenceModel
    } from '@app/dashboard/models';
import { WritingConf } from '@app/core/confs';
import { LocalStorageService, LoadingHandlerService, RouteHandlerService , ErrorHandlerService, UtilService} from '@app/core/services';
import { WritingResultService } from '@app/dashboard/services';
import { takeUntil, finalize} from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ErrorModel } from '@app/core/models';
import { DetailPopupComponent } from './components/detail-popup/detail-popup.component';
import { DomSanitizer} from "@angular/platform-browser";
import { forkJoin } from "rxjs/observable/forkJoin";
import { ScrollToService } from 'ng2-scroll-to-el';

declare var jquery:any;
declare var $:any;
declare var hopscotch:any;

@Component({
  selector: 'el-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.scss']
})
export class WritingResultComponent implements OnInit, OnDestroy{

    resultdemo:any={};
  constructor(
      private writingResultService : WritingResultService,
      private errorHandlerService: ErrorHandlerService ,
      private route : ActivatedRoute,
      public util : UtilService,
      private domSanitizer : DomSanitizer,
      private scrollService : ScrollToService,
      private router:Router
    ) { }

  ngUnsubscribe = new Subject();
  writingConf = new WritingConf();

  @Input() attemptId : number;
  @ViewChild('embed') iframe : ElementRef;

  showPopup : boolean;
  time_to_complete : string = null;
  embed_url = null;

  highlights : any = null;
  words : MatchModel[] = [];

  ctl = null;
  ngAfterViewInit() {
        hopscotch.endTour(['clearCookie'])
        var _this=this;
        var tour = {
            id: "hello-hopscotch",
            onEnd:function(){
                _this.router.navigate(['/dashboard/writing/results/'+_this.attemptId]);
            },
            steps: [
                {
                    title: "My Header",
                    content: "Well done on completing your first writing attempt, to start- check how long you took and how many words you wrote.",
                    target: document.querySelector("#reportcard"),
                    placement: "right",
                    width: 200
                },
                {
                    title: "My Header",
                    content: "This is where you can see your writing analysed by the baseline system, we look at Spelling & Grammar, Structure & Rhythm and Writing Clarity and make suggestions for improvement. Click any of the highlighted words and you’ll be taken to the information console.",
                    target: document.querySelector("#analyseby"),
                    placement: "right",
                    width: 200
                },
                {
                    title: "My Header",
                    content: "Homophones are common in English and can cause problems, switch this on to highlight all the homophones. Use the definition button to check any homophones you are unsure of.",
                    target: document.querySelector("#homophone_toggle"),
                    placement: "left",
                    width: 200,
                    onNext: function() {
                        $("#tab1").click()
                    }
                },
                {
                    title: "My Header",
                    content: "Here you can see some statistics about the structure your writing.",
                    target: document.querySelector("#homophone_toggle"),
                    placement: "left",
                    onNext: function() {
                        $("#subtab1").click()
                    }
                    
                },
                {
                    title: "My Header",
                    content: "Rhythm looks at your use of long, medium and short sentences. Utilising a mix of sentences in each paragraph makes your writing flow nicely.",
                    target: document.querySelector("#homophone_toggle"),
                    placement: "top",
                    xOffset: 130,
                    yOffset:-50,
                    onNext: function() {
                        $("#subtab2").click()
                    }
                }
                ,
                {
                    title: "My Header",
                    content: "Readability uses a formula to calculate the ‘minimum age’ someone would need to be to read your writing.",
                    target: document.querySelector("#homophone_toggle"),
                    placement: "top",
                    xOffset: 230,
                    yOffset:-50,
                    onNext: function() {
                        $("#tab2").click()
                    }
                }
                ,
                {
                    title: "My Header",
                    content: "Writing clarity searched for phrases or words that could be changed to make your writing cleaner and easier to read. We also analyze the essay to look for the dominant ‘tone’ and ‘sentiment’ of your writing.",
                    target: document.querySelector("#tab2"),
                    placement: "right",
                    width: 200
                    
                }
            ]
        };
        setTimeout(function(){
            hopscotch.startTour(tour);
        },2000)
        
  }  
  ngOnInit() {
      LoadingHandlerService.show();
        this.ctl = {
            text : '',
            count_words : 0,
            match : null,
            tones : [],
            sentiments : null,
            highlights : null,
            practices : [],
            baseline : '',
            sub : null,
            type : null,
            sentence : null,
        }

        const attempt = {
            attempt_id : this.attemptId,
            user_id : LocalStorageService.getUser().id
        }

                this.resultdemo = {"id":28,"time":35654,"text":"Australia wide, there are over 250,000 students who sit the NAPLAN test. 85,000 students in New South <br>\nWales will be required to sit an OLNA style assessment staring in 2020. This assessment will be <br>\ncompulsory for all students in order to graduate and represents a significant growth market. Victoria is also<br>\nconsidering implementing an OLNA style test for grades 11 and 12, representing an addtional students<br>\npopulation of around 80,000.<br>\nIn Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass the OSSLT to <br>\ngraduate. There are 302 elementary/secondary schools and 359 secondary schools in Ontario representing <br>\naproximately 300,000 students, all of whom will have topass the OSSLT to graduate.<br>\nA smaller segment of the market is home schooled students, with approximately 6500 currently in Ontario,<br>\n24,000 in Canada and 12,000 in Australia.","count_words":144,"tones":"{\"document_tone\":{\"tones\":[]},\"sentences_tone\":[{\"sentence_id\":0,\"text\":\"Australia wide, there are over 250,000 students who sit the NAPLAN test.\",\"tones\":[]},{\"sentence_id\":1,\"text\":\"85,000\",\"tones\":[]},{\"sentence_id\":2,\"text\":\"students in New South \",\"tones\":[{\"score\":0.559541,\"tone_id\":\"joy\",\"tone_name\":\"Joy\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":3,\"text\":\"Wales will be required to sit an OLNA style assessment staring in 2020.\",\"tones\":[{\"score\":0.784773,\"tone_id\":\"analytical\",\"tone_name\":\"Analytical\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":4,\"text\":\"This\",\"tones\":[]},{\"sentence_id\":5,\"text\":\"assessment will be \",\"tones\":[{\"score\":0.842108,\"tone_id\":\"analytical\",\"tone_name\":\"Analytical\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":6,\"text\":\"compulsory for all students in order to graduate and represents a significant\",\"tones\":[{\"score\":0.849827,\"tone_id\":\"confident\",\"tone_name\":\"Confident\"},{\"score\":0.8152,\"tone_id\":\"analytical\",\"tone_name\":\"Analytical\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":7,\"text\":\"growth market.\",\"tones\":[{\"score\":0.564623,\"tone_id\":\"joy\",\"tone_name\":\"Joy\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":8,\"text\":\"Victoria is also\",\"tones\":[]},{\"sentence_id\":9,\"text\":\"considering implementing an OLNA style test for grades 11 and 12, representing\",\"tones\":[{\"score\":0.702145,\"tone_id\":\"analytical\",\"tone_name\":\"Analytical\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":10,\"text\":\"an addtional students\",\"tones\":[]},{\"sentence_id\":11,\"text\":\"population of around 80,000.\",\"tones\":[{\"score\":0.968123,\"tone_id\":\"tentative\",\"tone_name\":\"Tentative\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":12,\"text\":\"In Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass\",\"tones\":[]},{\"sentence_id\":13,\"text\":\"the OSSLT to \",\"tones\":[]},{\"sentence_id\":14,\"text\":\"graduate.\",\"tones\":[]},{\"sentence_id\":15,\"text\":\"There are 302 elementary/secondary schools and 359 secondary schools\",\"tones\":[]},{\"sentence_id\":16,\"text\":\"in Ontario representing \",\"tones\":[]},{\"sentence_id\":17,\"text\":\"aproximately 300,000 students, all of whom will have topass the OSSLT to\",\"tones\":[{\"score\":0.775702,\"tone_id\":\"confident\",\"tone_name\":\"Confident\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":18,\"text\":\"graduate.\",\"tones\":[]},{\"sentence_id\":19,\"text\":\"A smaller segment of the market is home schooled students, with approximately\",\"tones\":[{\"score\":0.75152,\"tone_id\":\"tentative\",\"tone_name\":\"Tentative\"}],\"description\":\"Hello this is a test\"},{\"sentence_id\":20,\"text\":\"6500 currently in Ontario,\",\"tones\":[]},{\"sentence_id\":21,\"text\":\"24,000 in Canada and 12,000 in Australia.\",\"tones\":[]}]}","matches":"[{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"there\",\"count\":158931},{\"value\":\"their\",\"count\":32535},{\"value\":\"they're\",\"count\":41143}],\"offset\":16,\"length\":5,\"sentence\":\"Australia wide, there are over 250,000 students who sit the NAPLAN test.\",\"rule\":{\"id\":\"HOMOPHONE_THERE\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"there, their, they're\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"Kaplan\"}],\"offset\":60,\"length\":6,\"context\":{\"text\":\"...e are over 250,000 students who sit the NAPLAN test. 85,000 students in New South  Wal...\",\"offset\":43,\"length\":6},\"sentence\":\"Australia wide, there are over 250,000 students who sit the NAPLAN test.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":89,\"length\":2,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"knew\",\"count\":18489},{\"value\":\"new\",\"count\":36702}],\"offset\":92,\"length\":3,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"HOMOPHONE_NEW\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"knew, new\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Writing clarity\",\"shortMessage\":\"writing clarity\",\"replacements\":[{\"value\":\"be required\"}],\"offset\":118,\"length\":11,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":[\"may be passive voice\"],\"issueType\":\"writing-clarity\",\"category\":{\"id\":\"be required\",\"name\":\"be required\",\"baseline\":\"Writing Clarity\",\"id_example\":[\"perhaps, possibly, maybe, sometimes\"]}}},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"to\",\"count\":1142671},{\"value\":\"too\",\"count\":69242},{\"value\":\"two\",\"count\":56099}],\"offset\":130,\"length\":2,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"HOMOPHONE_TO\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"to, too, two\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"Olga\"},{\"value\":\"Ulna\"},{\"value\":\"DLNA\"},{\"value\":\"LNA\"},{\"value\":\"OLA\"}],\"offset\":140,\"length\":4,\"context\":{\"text\":\"...South  Wales will be required to sit an OLNA style assessment staring in 2020. This ...\",\"offset\":43,\"length\":4},\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"stile\",\"count\":1},{\"value\":\"style\",\"count\":1643}],\"offset\":145,\"length\":5,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"HOMOPHONE_STYLE\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"stile, style\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":170,\"length\":2,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"be\",\"count\":289161},{\"value\":\"bee\",\"count\":546}],\"offset\":200,\"length\":2,\"sentence\":\"85,000\\nstudents in New South \\nWales will be required to sit an OLNA style assessment staring in 2020.\",\"rule\":{\"id\":\"HOMOPHONE_BE\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"be, bee\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"be\",\"count\":289161},{\"value\":\"bee\",\"count\":546}],\"offset\":200,\"length\":2,\"sentence\":\"This\\nassessment will be \\ncompulsory for all students in order to graduate and represents a significant\\ngrowth market.\",\"rule\":{\"id\":\"HOMOPHONE_BE\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"be, bee\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"for\",\"count\":347042},{\"value\":\"fore\",\"count\":102},{\"value\":\"four\",\"count\":14114}],\"offset\":219,\"length\":3,\"sentence\":\"This\\nassessment will be \\ncompulsory for all students in order to graduate and represents a significant\\ngrowth market.\",\"rule\":{\"id\":\"HOMOPHONE_FOR\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"for, fore, four\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"all\",\"count\":257720},{\"value\":\"awl\",\"count\":1}],\"offset\":223,\"length\":3,\"sentence\":\"This\\nassessment will be \\ncompulsory for all students in order to graduate and represents a significant\\ngrowth market.\",\"rule\":{\"id\":\"HOMOPHONE_ALL\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"all, awl\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"all\",\"count\":257720},{\"value\":\"awl\",\"count\":1}],\"offset\":223,\"length\":3,\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_ALL\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"all, awl\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Writing clarity\",\"shortMessage\":\"writing clarity\",\"replacements\":[{\"value\":\"in order to\"}],\"offset\":236,\"length\":11,\"sentence\":\"This\\nassessment will be \\ncompulsory for all students in order to graduate and represents a significant\\ngrowth market.\",\"rule\":{\"id\":[\"is wordy or unneeded\"],\"issueType\":\"writing-clarity\",\"category\":{\"id\":\"in order to\",\"name\":\"in order to\",\"baseline\":\"Writing Clarity\",\"id_example\":[]}}},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"to\",\"count\":1142671},{\"value\":\"too\",\"count\":69242},{\"value\":\"two\",\"count\":56099}],\"offset\":245,\"length\":2,\"sentence\":\"This\\nassessment will be \\ncompulsory for all students in order to graduate and represents a significant\\ngrowth market.\",\"rule\":{\"id\":\"HOMOPHONE_TO\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"to, too, two\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"Olga\"},{\"value\":\"Ulna\"},{\"value\":\"DLNA\"},{\"value\":\"LNA\"},{\"value\":\"OLA\"}],\"offset\":350,\"length\":4,\"context\":{\"text\":\"...ria is also considering implementing an OLNA style test for grades 11 and 12, repres...\",\"offset\":43,\"length\":4},\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"stile\",\"count\":1},{\"value\":\"style\",\"count\":1643}],\"offset\":355,\"length\":5,\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\\nIn Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass\\nthe OSSLT to \\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_STYLE\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"stile, style\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"for\",\"count\":347042},{\"value\":\"fore\",\"count\":102},{\"value\":\"four\",\"count\":14114}],\"offset\":366,\"length\":3,\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\\nIn Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass\\nthe OSSLT to \\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_FOR\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"for, fore, four\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"additional\"}],\"offset\":404,\"length\":9,\"context\":{\"text\":\"...t for grades 11 and 12, representing an addtional students population of around 80,000. I...\",\"offset\":43,\"length\":9},\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":460,\"length\":2,\"sentence\":\"This\\nassessment will be \\ncompulsory for all students in order to graduate and represents a significant\\ngrowth market.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":460,\"length\":2,\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\\nIn Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass\\nthe OSSLT to \\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"OS SLT\"},{\"value\":\"OSS LT\"}],\"offset\":494,\"length\":5,\"context\":{\"text\":\"...,000. In Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pas...\",\"offset\":43,\"length\":5},\"sentence\":\"In Secondary School Literacy Test(OSSLT) in grades 11 and 12.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":501,\"length\":2,\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\\nIn Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass\\nthe OSSLT to \\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"OS SLT\"},{\"value\":\"OSS LT\"}],\"offset\":545,\"length\":5,\"context\":{\"text\":\"...rades 11 and 12. Students must pass the OSSLT to  graduate. There are 302 elementary/...\",\"offset\":43,\"length\":5},\"sentence\":\"Students must pass\\nthe OSSLT to \\ngraduate.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"to\",\"count\":1142671},{\"value\":\"too\",\"count\":69242},{\"value\":\"two\",\"count\":56099}],\"offset\":551,\"length\":2,\"sentence\":\"Victoria is also\\nconsidering implementing an OLNA style test for grades 11 and 12, representing\\nan addtional students\\npopulation of around 80,000.\\nIn Secondary School Literacy Test(OSSLT) in grades 11 and 12. Students must pass\\nthe OSSLT to \\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_TO\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"to, too, two\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"there\",\"count\":158931},{\"value\":\"their\",\"count\":32535},{\"value\":\"they're\",\"count\":41143}],\"offset\":569,\"length\":5,\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_THERE\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"there, their, they're\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":638,\"length\":2,\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"approximately\"},{\"value\":\"proximately\"},{\"value\":\"a proximately\"}],\"offset\":667,\"length\":12,\"context\":{\"text\":\"...ondary schools in Ontario representing  aproximately 300,000 students, all of whom will have...\",\"offset\":43,\"length\":12},\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Writing clarity\",\"shortMessage\":\"writing clarity\",\"replacements\":[{\"value\":\"all of\"}],\"offset\":698,\"length\":6,\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":[\"is wordy or unneeded\"],\"issueType\":\"writing-clarity\",\"category\":{\"id\":\"all of\",\"name\":\"all of\",\"baseline\":\"Writing Clarity\",\"id_example\":[]}}},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"to pass\"},{\"value\":\"top ass\"}],\"offset\":720,\"length\":6,\"context\":{\"text\":\"...300,000 students, all of whom will have topass the OSSLT to graduate. A smaller segmen...\",\"offset\":43,\"length\":6},\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible spelling mistake found\",\"shortMessage\":\"Spelling mistake\",\"replacements\":[{\"value\":\"OS SLT\"},{\"value\":\"OSS LT\"}],\"offset\":731,\"length\":5,\"context\":{\"text\":\"...dents, all of whom will have topass the OSSLT to graduate. A smaller segment of the m...\",\"offset\":43,\"length\":5},\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"MORFOLOGIK_RULE_EN_AU\",\"description\":\"Possible spelling mistake\",\"issueType\":\"misspelling\",\"category\":{\"id\":\"TYPOS\",\"name\":\"Possible Typo\",\"baseline\":\"Spelling & Grammar\"}},\"color\":\"#f25487\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"to\",\"count\":1142671},{\"value\":\"too\",\"count\":69242},{\"value\":\"two\",\"count\":56099}],\"offset\":737,\"length\":2,\"sentence\":\"There are 302 elementary/secondary schools and 359 secondary schools\\nin Ontario representing \\naproximately 300,000 students, all of whom will have topass the OSSLT to\\ngraduate.\",\"rule\":{\"id\":\"HOMOPHONE_TO\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"to, too, two\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Writing clarity\",\"shortMessage\":\"writing clarity\",\"replacements\":[{\"value\":\"approximately\"}],\"offset\":818,\"length\":13,\"sentence\":\"A smaller segment of the market is home schooled students, with approximately\\n6500 currently in Ontario,\\n24,000 in Canada and 12,000 in Australia.\",\"rule\":{\"id\":[\"When writing, we often use words that can weaken the point we are trying to make. Words such as 'sometimes' or 'basically' can take away emphasis from the point you are trying to make. \"],\"issueType\":\"writing-clarity\",\"category\":{\"id\":\"approximately\",\"name\":\"approximately\",\"baseline\":\"Writing Clarity\",\"id_example\":[]}}},{\"message\":\"Writing clarity\",\"shortMessage\":\"writing clarity\",\"replacements\":[{\"value\":\"currently\"}],\"offset\":837,\"length\":9,\"sentence\":\"A smaller segment of the market is home schooled students, with approximately\\n6500 currently in Ontario,\\n24,000 in Canada and 12,000 in Australia.\",\"rule\":{\"id\":[\"When writing, we often use words that can weaken the point we are trying to make. Words such as 'sometimes' or 'basically' can take away emphasis from the point you are trying to make. \"],\"issueType\":\"writing-clarity\",\"category\":{\"id\":\"currently\",\"name\":\"currently\",\"baseline\":\"Writing Clarity\",\"id_example\":[]}}},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":847,\"length\":2,\"sentence\":\"A smaller segment of the market is home schooled students, with approximately\\n6500 currently in Ontario,\\n24,000 in Canada and 12,000 in Australia.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":870,\"length\":2,\"sentence\":\"A smaller segment of the market is home schooled students, with approximately\\n6500 currently in Ontario,\\n24,000 in Canada and 12,000 in Australia.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"},{\"message\":\"Possible homophone found\",\"shortMessage\":\"Homophone\",\"replacements\":[{\"value\":\"in\",\"count\":492285},{\"value\":\"inn\",\"count\":425}],\"offset\":891,\"length\":2,\"sentence\":\"A smaller segment of the market is home schooled students, with approximately\\n6500 currently in Ontario,\\n24,000 in Canada and 12,000 in Australia.\",\"rule\":{\"id\":\"HOMOPHONE_IN\",\"description\":\"Possible homophone detected\",\"issueType\":\"homophone\",\"category\":{\"id\":\"HOMOPHONE\",\"name\":\"in, inn\",\"baseline\":\"Spelling & Grammar\"}},\"rulename_message\":\"A homophone is a word that is spelled differently but sounds the same. Check and make sure that you used the correct word in your sentence!\",\"color\":\"#cce2e2\"}]","subattempts":[],"practices":[{"resource_name":"Homophone Practice Game!","category":"HOMOPHONE","embed":"https://www.sporcle.com/framed/?v=8&pm&gid=5e5643bb99c&fid=5ab3ce580c478&width=760"}]}
                this.ctl.text = this.resultdemo.text;
                //---------------Comprehend & Highlights -----------------------------
                const comprehend = this.writingResultService.getComprehend(this.ctl.text);
                const highlights = this.writingResultService.getHighlights(this.ctl.text);
                forkJoin([comprehend, highlights])
                    .pipe(
                        finalize(()=>LoadingHandlerService.hide()),
                        takeUntil(this.ngUnsubscribe)
                    )
                    .subscribe((res) => {
                    //---------------------set control variable : ctl -------------------------
                        this.ctl.time = this.resultdemo.time;
                        this.ctl.count_words = this.resultdemo.count_words;
                        this.ctl.tones =  JSON.parse(this.resultdemo.tones);
                        this.ctl.practices = this.resultdemo.practices;
                        this.ctl.sentiments = res[0];
                        this.ctl.highlights = res[1];
                        this.ctl.type = 'SentenceNode';
                        this.ctl.sentence = {};
                        this.ctl.sentence['text'] = '';
                        //------------------------------convert matches to display------------------------------
                        const matches = JSON.parse(this.resultdemo.matches);
                        this.format_words_to_display(matches);
                        this.words = this.util.sort(this.words, 'offset', 'ascend');
                        //--------------Mode Switch--------------------------------------------------------------------------
                        this.baseline_set(this.writingConf.baseline_titles[0]);
                    });
  }

  ngOnDestroy()
  {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

  word_highlight(baseline : string)
  {
    var result_text = document.getElementById("result_text");
    var highlight_text = this.ctl.text;
    var html_length : number = 0;
    for(var i = 0 ; i < this.words.length ; i++)
    {
        let v = this.writingConf.get_config(this.ctl.baseline, "homophone_toggle", "value");

        if(this.words[i].baseline != baseline)
            continue;
        if(this.words[i].category_id == 'HOMOPHONE' && v)
            continue;

        const issue = this.words[i];
        if(issue.text == "br" || issue.text.search("<") != -1 || issue.text.search(">") != -1)
            continue;

        let one = this.words.filter(res => ((res.offset == issue.offset || this.util.include(res, issue)) && res.baseline == issue.baseline));

        if(one.length > 1 && one[0] != issue)
            continue;
        one = one.filter(res => (!(res.category_id == 'HOMOPHONE' && v)));

        const index = issue.offset + html_length;
        const hl_css : string = 'background : ' + issue.color;
        var plusHTML;
        plusHTML = "<div class='dropdown'><span id=" + i + " class='highlight_word' style = '" + hl_css + "'>" + issue.text + "</span>";
        plusHTML += "<div class='dropdown-content'>";
        for(let item of one)
            plusHTML += "<span id=" + this.words.indexOf(item) + ">" + item.category_id + "</span>";
        plusHTML += "</div></div>";

        highlight_text = highlight_text.substring(0,index) + plusHTML + highlight_text.substring(index + issue.length);
        html_length += plusHTML.length - issue.length;
    }
    result_text.innerHTML = highlight_text;
  }

  sentence_highlight(v, type)
  {
      var result_text = document.getElementById("result_text");
      var highlight_text = this.ctl.text;
      var html_length : number = 0;
      var id = 0;
      var sentences = v.find((res) => res.type == type)['sentences'];
      for(let sentence of sentences)
      {
          const index = sentence.offset + html_length;
          const length = sentence.length;
          const text  = this.ctl.text.slice(sentence.offset, sentence.offset + length);
          const style : string = ' style="background : ' + sentence.color + '"';
          var plusHTML;
          plusHTML = "<span id=" + id + " class='highlight_sentence' " + style + ">" + text + "</span>";
          highlight_text = highlight_text.substring(0,index) + plusHTML + highlight_text.substring(index + length);
          html_length += plusHTML.length - length;
          id += 1;
      }
      result_text.innerHTML = highlight_text;
  }

  baseline_set(baseline : string, sub : string = null, type : string = null)
  {
      if(this.ctl.baseline == baseline && this.ctl.sub == sub)
        return;
      if(this.ctl.baseline)
        this.writingConf.set_config(1, this.ctl.baseline, 'sel_status');
      this.writingConf.set_config(0, baseline, 'sel_status');
      this.ctl.baseline = baseline;
      if(sub)
      {
          this.writingConf.set_config(1, this.ctl.baseline, 'subs', this.ctl.sub, 'style');
          this.ctl.sub = sub;
          this.writingConf.set_config(0, this.ctl.baseline, 'subs', this.ctl.sub, 'style');
      }
      else
          this.ctl.sub = this.writingConf.activated_sub(this.ctl.baseline);

      this.showPopup = this.writingConf.get_config(baseline, 'always_detail_show'), this.embed_url = null;

      if(this.writingConf.show_section(this.ctl.baseline, 'word' , this.ctl.sub))
        this.word_highlight(baseline);
      else
      {
        let k = this.writingConf.get_config(this.ctl.baseline, 'subs', this.ctl.sub, 'value');
        this.sentence_highlight(this.util.json_solver(this.ctl.highlights, k), this.ctl.type);
      }
  }

  format_words_to_display(matches)
  {
      for(let match of matches)
      {
          const item : MatchModel = {
              color : match.color ? match.color : '#55b',
              offset : match.offset,
              length : match.length,
              message : match.rule.category.baseline == 'Writing Clarity'? match.rule.id : match.message,
              rulename_message : match.rulename_message,
              baseline : match.rule.category.baseline,
              id_example : match.rule.category.id_example,
              category_id : match.rule.category.id,
              description : match.rule.category.baseline == 'Writing Clarity' ? match.rule.category.id : match.rule.description,
              text : this.ctl.text.slice(match.offset, match.offset + match.length),
              replacements : match.replacements,
              sentence : match.sentence
          }
          item.replacements = this.util.sort(item.replacements, 'count', 'descend');
          this.words.push(item);
      }
  }

  show_detail(event, element)
  {
      if(this.writingConf.show_section(this.ctl.baseline, 'word' , this.ctl.sub))
      {
            this.ctl.match = this.words[event.target.id];
            if(!this.ctl.match)
            {
                this.showPopup = false;
                return;
            }
            this.scrollService.scrollTo(element, 1000);
      }
      else
      {
            let k = this.writingConf.get_config(this.ctl.baseline, 'subs', this.ctl.sub, 'value');
            let v = this.util.json_solver(this.ctl.highlights, k);
            let s = v.find((res) => res.type == this.ctl.type)['sentences'];
            if(s[event.target.id])
            {
                this.ctl.sentence = s[event.target.id];
                this.ctl.sentence.text = event.target.innerHTML;
                this.scrollService.scrollTo(element, 1000);
            }
      }
      this.showPopup = true;
  }

  embed(url, element) {
    const new_url = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    if(new_url !== this.embed_url)
    {
        this.embed_url = new_url;
        this.scrollService.scrollTo(element, 1000);
    }
  }

  category_select(option)
  {
      this.ctl.type = option;
      let k = this.writingConf.get_config(this.ctl.baseline, 'subs', this.ctl.sub, 'value');
      this.sentence_highlight(this.util.json_solver(this.ctl.highlights, k), this.ctl.type);
  }

  on_homonphone()
  {
      let v = !this.writingConf.get_config(this.ctl.baseline, "homophone_toggle", "value");
      this.writingConf.set_config(v, this.ctl.baseline, "homophone_toggle", "value");
      this.word_highlight(this.ctl.baseline);
  }
}
