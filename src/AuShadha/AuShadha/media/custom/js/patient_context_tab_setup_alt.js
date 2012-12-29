function patientContextTabSetup(){
//	alert("Running tab setup...");
require(
  ["dijit/registry",
   "dojo/parser",
   "dijit/layout/BorderContainer",
   "dijit/layout/TabContainer",
   "dojox/layout/ContentPane",
   //"dojox/layout/ExpandoPane",
   "dijit/Editor",
   "dijit/form/Button",
   "dojo/dom",
   "dojo/dom-construct",
   "dojo/dom-style",
   "dojo/ready",
   "dojo/_base/array",
   "dojo/request/xhr"
  ],
  function(registry,parser, BorderContainer,
           TabContainer, ContentPane, /*ExpandoPane,*/ Editor,Button,
           dom, domConstruct, domStyle, ready,array,xhr
  ){
//ready( function(){
      if (registry.byId("patientContextContainer")){
        console.log("Context Container already set up.. ")
        return;
      }
      else
      {
      console.log("No Content Panes set up so far.. setting the same..");

      domConstruct.destroy('frontPageSearchPatientAuShadhaLogo');
			console.log("Destroyed the logo....first..")
      domStyle.set(dom.byId('searchPatientContainerDiv'),{top           : "0px",
                                                          left          : "0px",
                                                          height        : "50px",
                                                          width         : "auto",
                                                          background    : "none",
                                                          border        : "none",
                                                          'boxShadow'   : "none",
                                                          "borderRadius": "none",
                                                          'fontSize'    : "inherit",
                                                          "padding"     : "0px 0px 10px 0px;",
                                                            overflow:'hidden',
                                                          "margin"      : "0px 0px 10px 0px;",
                                                          "display"     : "none"
                                                        });
      domStyle.set(dom.byId('searchTitle'),{top:"0px",left:"0px"});
      registry.byId('addPatientButton').set('iconClass',"addPatientIcon_16");
      domStyle.set(dom.byId('simplePatientFilteringSearch'),{top:"0px",
                                                            left:"0px",
                                                            overflow:'hidden',
                                                            height        : "50px",
                                                            width         : "auto",
                                                            background    : "none",
                                                            border        : "none",
                                                            'boxShadow'   : "none",
                                                            "borderRadius": "none",
                                                            'fontSize'    : "inherit",
                                                            "padding"     : "0px 0px 10px 0px;",
                                                            "margin"      : "0px 0px 10px 0px;"
                                                            });

      registry.byId('addPatientButton').set("style", {"fontSize": "12px"} );
      registry.byId('filteringSelectPatSearch').set("style",{width: "400px", left: "5%", "fontSize":"12px"} );
			
			console.log("Creating the necessary DOMS after setting some styles...")
			
      domConstruct.create('div',
                          {id: "patientSidebarTabContainer"},
                          "patientTabsBorderContainer",
                          "first"
      );
        domConstruct.create('div',
                            {id: "patientSidebarContentPane"},
                            "patientTabsBorderContainer",
                            "first"
        );
          domConstruct.create('div',
                              {id: "patientTreeContainer"},
                              "patientSidebarTabContainer",
                              "first"
          );
              domConstruct.create('div',
                                  {id: "patientTreeDiv"},
                                  "patientTreeContainer",
                                  "first"
              );
              domConstruct.create('div',
                                  {id: "patientSidebarDiv_allergy"},
                                  "patientTreeDiv",
                                  "after"
              );
                domConstruct.create('div',
                                    {id: "patientSidebarDiv_allergyHeader"},
                                    "patientSidebarDiv_allergy",
                                    "first"
                );
                domConstruct.create('div',
                                    {id: "patientSidebarDiv_allergyGridContainer"},
                                    "patientSidebarDiv_allergyHeader",
                                    "after"
                );
                  domConstruct.create('div',
                                  {id: "allergy_list"},
                                  "patientSidebarDiv_allergyGridContainer",
                                  "first"
                  );
        domConstruct.create('div',
                            {id: "patientSidebarDiv_media"},
                            "patientTreeContainer",
                            "after"
        );
            domStyle.set( dom.byId('patientSidebarContentPane'),{'minWidth'  : '17em',
                                                                 'minHeight' : "400px",
                                                                 'overflow'  : "auto"
            });
            domStyle.set( dom.byId('patientTreeContainer'),{'minWidth' : '17em',
                                                            'minHeight': "400px",
                                                            'overflow' : "auto"
            });
            console.log("Created a Patient Tree Container..." + dom.byId("patientTreeContainer"));
              domStyle.set( dom.byId('patientTreeDiv'),{'minWidth' : '17em',
                                                        'minHeight': "15em",
                                                        'overflow' : "auto",
                                                        "display"  : "block"
              });
              domStyle.set( dom.byId('patientSidebarDiv_allergy'),{'minWidth' : '15em'  ,
                                                                  'minHeight': "15em"  ,
                                                                  'overflow' : "hidden"  ,
                                                                  "display"  : "block" ,
                                                                  "float"    : "left"  ,
                                                                  "position" : "absolute"     ,
                                                                  "bottom"   : "0.3em"        ,
                                                                  "border"   : "solid 1px #ddd",
                                                                  "padding"  : "0.4em",
                                                                  "background":"#CFE5FA"
              });
                domStyle.set( dom.byId('patientSidebarDiv_allergyHeader'),
                                                                    {'minWidth'       : '15em'  ,
                                                                    'height'         : "auto"  ,
                                                                    "display"        : "block" ,
                                                                    "float"          : "left"  ,
                                                                    "clear"          : "both" ,
                                                                    "position"       : "relative",
                                                                    "top"            : "0"        ,
                                                                    "padding"        : "1px",
                                                                    "background"     : "#2D285A",
                                                                    "color"          : "whitesmoke",
                                                                    "textAlign"      : "center",
                                                                    "verticalAlign"  : "middle",
                                                                    "fontWeight"     : "bold",
                                                                    "fontFamily"     : "dejavu sans"
                });
                  dom.byId("patientSidebarDiv_allergyHeader").innerHTML = "ALLERGY";
                domStyle.set( dom.byId('patientSidebarDiv_allergyGridContainer'),
                                                                    {'maxWidth'         : '15em'  ,
                                                                    'height'         : "auto"  ,
                                                                    "display"        : "block" ,
                                                                    "float"          : "left"  ,
                                                                    "clear"          : "both" ,
                                                                    "position"       : "relative",
                                                                    "top"            : "0"        ,
                                                                    "fontFamily"     : "dejavu sans"
                });
            domStyle.set( dom.byId('patientSidebarDiv_media'),{'minWidth' : '275px',
                                                               'minHeight': "400px",
                                                               'overflow' : "auto"
            });

      domConstruct.create('div',
                          {id: "patientContextTabs"},
                          "patientContextContainer",
                          "first"
      );
      console.log("Created a PatientContextTabs..." + dom.byId("patientContextTabs"));

      console.log("Starting to set up individual tabs.. now creating domElements for the same");

      domConstruct.create('div',
                          {id: "patientSummaryTab"},
                         "patientContextTabs",
                         "first"
      );
        domConstruct.create('div',
                            {id: "patientSynopsisBorderContainer"},
                          "patientSummaryTab",
                          "first"
        );
        
          domConstruct.create('div',
                              {id: "patientSynopsisTopContentPane"},
                            "patientSynopsisBorderContainer",
                            "first"
          );
       
            domConstruct.create('div',
                                {id: "medication_list"},
                                "patientSynopsisTopContentPane",
                                "first"
            );

          domConstruct.create('div',
                              {id: "patientSynopsisBottomContentPane"},
                            "patientSynopsisTopContentPane",
                            "after"
          );

            domConstruct.create('div',
                                {id: "patientSynopsisBottomTabContainer"},
                              "patientSynopsisBottomContentPane",
                              "first"
            );

              domConstruct.create('div',
                              {id: "patientSynopsisBottomContentPaneVisits"},
                            "patientSynopsisBottomTabContainer",
                            "first"
              );
                domConstruct.create('div',
                                  {id: "patientNewVisitNotes"},
                                "patientSynopsisBottomContentPaneVisits",
                                "first"
                );
                domConstruct.create('div',
                                  {id: "visit_list_container"},
                                "patientSynopsisBottomContentPaneVisits",
                                "last"
                );
                  domConstruct.create('div',
                                    {id: "visit_list"},
                                  "visit_list_container",
                                  "first"
                  );
              domConstruct.create('div',
                                {id: "patientSynopsisBottomContentPaneAdmissions"},
                              "patientSynopsisBottomContentPaneVisits",
                              "after"
              );
                domConstruct.create('div',
                                  {id: "patientNewAdmissionNotes"},
                                  "patientSynopsisBottomContentPaneAdmissions",
                                  "first"
                );
                domConstruct.create('div',
                                  {id: "admission_list_container"},
                                "patientSynopsisBottomContentPaneAdmissions",
                                "last"
                );
                  domConstruct.create('div',
                                    {id: "admission_list"},
                                  "admission_list_container",
                                  "first"
                  );

      domConstruct.create('div',
                          {id: "patientHistoryTab"},
                          "patientContextTabs",
                          "last"
      );

        domConstruct.create('div',
                            {id: "patientHistoryTabs"},
                            "patientHistoryTab",
                            "first"
        );
          domConstruct.create('div',
                              {id: "patientSocialHistoryTab"},
                              "patientHistoryTabs",
                              "first"
          );
          domConstruct.create('div',
                              {id: "patientFamilyHistoryTab"},
                              "patientHistoryTabs",
                              "last"
          );
            domConstruct.create('div',
                                {id: "family_history_list"},
                                "patientFamilyHistoryTab",
                                "first"
            );
          domConstruct.create('div',
                              {id: "patientMedicalAndSurgicalHistoryTab"},
                              "patientHistoryTabs",
                              "last"
          );

            domConstruct.create('div',
                                {id: "medical_history_list"},
                                "patientMedicalAndSurgicalHistoryTab",
                                "first"
            );
            domConstruct.create('div',
                                {id: "surgical_history_list"},
                                "patientMedicalAndSurgicalHistoryTab",
                                "last"
             );

    domConstruct.create('div',
                          {id: "patientPreventiveHealthTab"},
                          "patientContextTabs",
                          "last"
      );
        domConstruct.create('div',
                            {id: "patientPreventiveTabs"},
                            "patientPreventiveHealthTab",
                            "first"
        );
          domConstruct.create('div',
                              {id: "patientImmunisationTab"},
                              "patientPreventiveTabs",
                              "first"
          );
            domConstruct.create('div',
                                {id: "immunisation_list"},
                                "patientImmunisationTab",
                                "first"
            );

      console.log("Created all the necessary DOM ELements.. Creating Dijits")

     console.log("Building Patient Tree..")
     buildPatientTree();
     console.log("Finished Building Patient Tree..")

      var mainBorderContaner = registry.byId("patientTabsBorderContainer");
      domStyle.set(mainBorderContaner.domNode,
                        {"height":"50em","width":"100em","overflow":"auto"}
      );

        var sideBarContentPane = new ContentPane({id     : "patientSidebarContentPane",
                                                  region :"leading",
                                                  splitter:true,
                                                  style :"width:18em;"
                                              },
                                            "patientSidebarContentPane"
        );
        mainBorderContaner.addChild(sideBarContentPane);

          var sideBarTabContainer = new TabContainer({id     : "patientSidebarTabContainer",
                                                tabStrip  : true,
                                                tabPosition:'bottom',
                                                },
                                              "patientSidebarTabContainer"
          );
          sideBarContentPane.addChild(sideBarTabContainer)

            var sidebarTreeContainer = new ContentPane({id     : "patientTreeContainer",
                                                    title  : "Tree",
                                                    iconClass:"navigationIcon",
                                                    showTitle: false,
                                                    toolTip: "Patient Tree"
                                                  },
                                                "patientTreeContainer"
            );
            sideBarTabContainer.addChild(sidebarTreeContainer);

            var sidebarMediaContainer = new ContentPane({id     : "patientSidebarDiv_media",
                                                  title : "Media",
                                                  iconClass:"mediaIcon",
                                                  showTitle: false,
                                                  },
                                                "patientSidebarDiv_media"
            );
            sideBarTabContainer.addChild(sidebarMediaContainer);  

          console.log("Created patientTreeContainer Dijit")
          console.log("Adding patientTreeContainer Dijit to the BorderContainer")
          console.log("Added all the sidebar dijits..")

        var mainContainer = new ContentPane({id  : "patientContextContainer",
                                            region  : "center",
                                            splitter:true,
                                           },
                                           "patientContextContainer"
        );

        console.log("Created patientContextContainer Dijit")
        console.log("Adding patientContextContainer Dijit to the BorderContainer")

        mainBorderContaner.addChild(mainContainer);

        require(["dojo/ready", "dijit/MenuBar",
                "dijit/PopupMenuBarItem", "dijit/Menu",
                "dijit/MenuItem", "dijit/DropDownMenu","dijit/MenuBarItem"
                ],
                function(ready, MenuBar, PopupMenuBarItem, Menu, MenuItem, DropDownMenu,MenuBarItem){
                      var pMenuBar = new MenuBar({});

                      var pSynopsisLayout = new DropDownMenu({});
                        pSynopsisLayout.addChild(new MenuItem({
                            label: "Default"
                        }));
                        pSynopsisLayout.addChild(new MenuItem({
                            label: "Portlets Only"
                        }));
                        pSynopsisLayout.addChild(new MenuItem({
                            label: "Tabbed Layout"
                        }));

                      var pAddMenu = new DropDownMenu({});
                        pAddMenu.addChild(new MenuItem({
                            label: "Neonatal History",
                            onClick   :  function(){
                                        require(["dojo/dom-construct",
                                                "dojo/dom-style",
                                                "dojox/layout/ContentPane",
                                                "dijit/registry","dojo/dom"],
                                          function(domConstruct,domStyle,ContentPane,registry,dom){
                                            var urlDict = {"neontalAndPaediatricExamUrl": CHOSEN_PATIENT.neonatalandpaediatricexamurl
                                            }
                                            if(!registry.byId('patientNeonatalAndPaediatricExamTab') ){
                                                console.log(CHOSEN_PATIENT);
                                                makeNeonatalAndPaediatricExamTab(urlDict);
                                            }
                                            else{
                                              registry.byId('patientContextTabs').selectChild(
                                                registry.byId('patientPreventiveHealthTab') )
                                              registry.byId("patientPreventiveTabs").selectChild(
                                                registry.byId("patientNeonatalAndPaediatricExamTab")
                                              );
                                            }
                                          }
                                        )
                          }
                        }));
                        pAddMenu.addChild(new MenuItem({
                            label: "Obs.History",
															onClick   :  function(){
																					require(["dojo/dom-construct",
																									"dojo/dom-style",
																									"dojox/layout/ContentPane",
																									"dijit/registry","dojo/dom"],
																						function(domConstruct,domStyle,ContentPane,registry,dom){
																							var urlDict = {"obstetricHistoryUrl": CHOSEN_PATIENT.obstetrichistorydetailadd
																							}
																							if(!registry.byId('patientObstetricsPreventivesTab') ){
																									console.log(CHOSEN_PATIENT);
																									makeObstetricHistoryDetailTab(urlDict);
																							}
																							else{
																								registry.byId('patientContextTabs').selectChild(
																									registry.byId('patientPreventiveHealthTab') )
																								registry.byId("patientPreventiveTabs").selectChild(
																									registry.byId("patientObstetricsPreventivesTab")
																								);
																							}
																						}
																					)
														}
                        }));
                        pAddMenu.addChild(new MenuItem({
                            label: "Gyn.History",
                              onClick   :  function(){
                                          require(["dojo/dom-construct",
                                                  "dojo/dom-style",
                                                  "dojox/layout/ContentPane",
                                                  "dijit/registry","dojo/dom"],
                                            function(domConstruct,domStyle,ContentPane,registry,dom){
                                              var urlDict = {"gynaecologyHistoryUrl": CHOSEN_PATIENT.gynaecologyhistorydetailadd
                                              }
                                              if(!registry.byId('patientGynaecologyPreventivesTab') ){
                                                  console.log(CHOSEN_PATIENT);
                                                  makeGynaecologyHistoryDetailTab(urlDict);
                                              }
                                              else{
                                                registry.byId('patientContextTabs').selectChild(
                                                  registry.byId('patientPreventiveHealthTab') )
                                                registry.byId("patientPreventiveTabs").selectChild(
                                                  registry.byId("patientGynaecologyPreventivesTab")
                                                );
                                              }
                                            }
                                          )
                            }
                        }));
                        pAddMenu.addChild(new MenuItem({
                            label: "Medical Preventives",
                            onClick   :  function(){
                                        require(["dojo/dom-construct",
                                                "dojo/dom-style",
                                                "dojox/layout/ContentPane",
                                                "dijit/registry","dojo/dom"],
                                          function(domConstruct,domStyle,ContentPane,registry,dom){
                                            var urlDict = {"medicalPreventivesUrl": CHOSEN_PATIENT.medicalpreventivesadd
                                            }
                                            if(!registry.byId('patientMedicalPreventivesTab') ){
                                                console.log(CHOSEN_PATIENT);
                                                makeMedicalPreventivesTab(urlDict);
                                            }
                                            else{
                                              registry.byId('patientContextTabs').selectChild(
                                                registry.byId('patientPreventiveHealthTab') )
                                              registry.byId("patientPreventiveTabs").selectChild(
                                                registry.byId("patientMedicalPreventivesTab")
                                              );
                                            }
                                          }
                                        )
                          }
                        }));
                        pAddMenu.addChild(new MenuItem({
                            label: "Surgical Preventives",
                            onClick   :  function(){
                                        require(["dojo/dom-construct",
                                                "dojo/dom-style",
                                                "dojox/layout/ContentPane",
                                                "dijit/registry","dojo/dom"],
                                          function(domConstruct,domStyle,ContentPane,registry,dom){
                                            var urlDict = {"surgicalPreventivesUrl": CHOSEN_PATIENT.surgicalpreventivesadd
                                            }
                                            if(!registry.byId('patientSurgicalPreventivesTab') ){
                                                console.log(CHOSEN_PATIENT);
                                                makeSurgicalPreventivesTab(urlDict);
                                            }
                                            else{
                                              registry.byId('patientContextTabs').selectChild(
                                                registry.byId('patientPreventiveHealthTab') )
                                              registry.byId("patientPreventiveTabs").selectChild(
                                                registry.byId("patientSurgicalPreventivesTab")
                                              );
                                            }
                                          }
                                        )
                          }
                        }));

                      pMenuBar.addChild(new PopupMenuBarItem({
                          label     : "Customise",
                          title     : "Personalize Layout of Application",
                          popup     : pSynopsisLayout,
                          iconClass : "navigationIcon"
                      }));

                      pMenuBar.addChild(new PopupMenuBarItem({
                          label: "Add-On Sheets",
                          title: "Add specific Speciality History and Preventive Info.",
                          popup: pAddMenu,
                          iconClass: "dijitEditorIcon dijitEditorIconCopy"
                      }));
                      pMenuBar.addChild(new MenuBarItem({
                          title     : "Contacts, Demographics and Insurance Info.",
                          label     : "Demographics",
                          onClick   :  function(){
                                        require(["dojo/dom-construct",
                                                 "dojo/dom-style",
                                                 "dojox/layout/ContentPane",
                                                 "dijit/registry","dojo/dom"],
                                          function(domConstruct,domStyle,ContentPane,registry,dom){
                                            var urlDict = {demographicsUrl : CHOSEN_PATIENT.demographicsadd,
																																contactUrl 			 : CHOSEN_PATIENT.contactjson,
																																phoneUrl 				 : CHOSEN_PATIENT.phonejson,
																																guardianUrl			 : CHOSEN_PATIENT.guardianjson
																						 }
                                            if(!registry.byId('contactAndDemographicsTab') ){
																							   console.log(CHOSEN_PATIENT);
																								makeDemographicsTab(urlDict);
                                            }
                                            else{
																							registry.byId("patientContextTabs").selectChild(
																								registry.byId("contactAndDemographicsTab")
																							);
																						 }
                                          }
                                        )
                          }
                      }));

                      pMenuBar.set("style",{
                                            "position"   : "relative",
                                            "float"      : "right",
                                            });

/*
                      var pSubMenu2 = new DropDownMenu({});
                      pSubMenu2.addChild(new MenuItem({
                          label: "Cut",
                          iconClass: "dijitEditorIcon dijitEditorIconCut"
                      }));
                      pSubMenu2.addChild(new MenuItem({
                          label: "Copy",
                          iconClass: "dijitEditorIcon dijitEditorIconCopy"
                      }));
                      pSubMenu2.addChild(new MenuItem({
                          label: "Paste",
                          iconClass: "dijitEditorIcon dijitEditorIconPaste"
                      }));

                      pMenuBar.addChild(new PopupMenuBarItem({
                          label: "Edit",
                          popup: pSubMenu2
                      }));
*/
                      domConstruct.create('div',{'id':"patientMenuBar"},'patientTabsBorderContainer','before');
                      pMenuBar.placeAt('patientMenuBar');
                      pMenuBar.startup();
//                  });
                }
        );

				domStyle.set('patientMenuBar',
										 {'top'		    : "2.5em",
											"right" 	  : "1em",
								      "position" : "relative",
										  "zIndex"   : "1"
								     }
				);

				registry.byId("patientTabsBorderContainer").resize();
				registry.byId('patientContextContainer').set('dolayout',true);
				
        var tabs = new TabContainer({id: "patientContextTabs",
                                     tabPosition:"top",
                                     tabStrip:true,
                                     nested: false,
                                     style : "min-height: 550px;overflow:auto;"
                                    },
                                    "patientContextTabs"
        );
        console.log("Created patientContextTabs Dijit")
        mainContainer.addChild(tabs);
        console.log("Added patientContextTabs to patientContextContainer Dijit");

        var summaryTab = new ContentPane({id:"patientSummaryTab",
                                          title:"Synopsis"
                                          },
                                          "patientSummaryTab"
        );
        tabs.addChild(summaryTab);
          var patientSynopsisBorderContainer = new BorderContainer({id:"patientSynopsisBorderContainer",
                                                                  //doLayout:true,
                                                                      },
                                            "patientSynopsisBorderContainer"
          );
          summaryTab.addChild(patientSynopsisBorderContainer);
            var patientSynopsisTopContentPane = new ContentPane({
                                                  id:"patientSynopsisTopContentPane",
                                                  region: "center",
                                                  splitter: true
                                                  },
                                              "patientSynopsisTopContentPane"
            );
            patientSynopsisBorderContainer.addChild(patientSynopsisTopContentPane);

            var patientSynopsisBottomContentPane = new ContentPane({
                                                          id:"patientSynopsisBottomContentPane",
                                                          region: "bottom",
                                                            splitter: true
                                                          },
                                            "patientSynopsisBottomContentPane"
            );
            patientSynopsisBorderContainer.addChild(patientSynopsisBottomContentPane);
              var patientSynopsisBottomTabContainer = new TabContainer({
                                                            id:"patientSynopsisBottomTabContainer",
                                                            tabStrip:true,
                                                            tabPosition:"top",
                                                            nested: true
                                                            },
                                              "patientSynopsisBottomTabContainer"
              );
              patientSynopsisBottomContentPane.addChild(patientSynopsisBottomTabContainer);


                var patientSynopsisBottomContentPaneVisits = new ContentPane({
                                                            id:"patientSynopsisBottomContentPaneVisits",
                                                            title: "Visit",
                                                            toolTip: "Enter New Visit"
                                                            },
                                              "patientSynopsisBottomContentPaneVisits"
                );
                patientSynopsisBottomTabContainer.addChild(patientSynopsisBottomContentPaneVisits);
                  var visitNotesEditor = new Editor({id:"patientNewVisitNotes",style:"width:50em;"},"patientNewVisitNotes");
                  patientSynopsisBottomContentPaneVisits.addChild(visitNotesEditor);

                  var VisitListContainer = new ContentPane({
                                                            id:"visit_list_container"
                                                            },
                                              "visit_list_container"
                  );
                  patientSynopsisBottomContentPaneVisits.addChild(VisitListContainer);
                  //setupVisitGrid(CHOSEN_PATIENT.visitjson);
                  registry.byId("visit_list_container").set('href', CHOSEN_PATIENT.visitadd);

                var patientSynopsisBottomContentPaneAdmissions = new ContentPane({
                                                            id:"patientSynopsisBottomContentPaneAdmissions",
                                                            title : "Admission",
                                                            toolTip:"Record New Admission"
                                                            },
                                              "patientSynopsisBottomContentPaneAdmissions"
                );
                patientSynopsisBottomTabContainer.addChild(patientSynopsisBottomContentPaneAdmissions);
                  var admissionNotesEditor = new Editor({id:"patientNewAdmissionNotes",style:"width:50em;"},"patientNewAdmissionNotes");
                  patientSynopsisBottomContentPaneAdmissions.addChild(admissionNotesEditor);
                  var AdmissionListContainer = new ContentPane({
                                                            id:"admission_list_container"
                                                            },
                                              "admission_list_container"
                  );
                  patientSynopsisBottomContentPaneAdmissions.addChild(AdmissionListContainer);
                  //setupAdmissionGrid(CHOSEN_PATIENT.admissionjson);
                  //registry.byId("admission_list_container").set('href', CHOSEN_PATIENT.admissionadd);

        var historyTab = new ContentPane({id:"patientHistoryTab",
                                          title:"History"
                                          },
                                          "patientHistoryTab"
                                          );
        tabs.addChild(historyTab);
          var historyTabs = new TabContainer({id:"patientHistoryTabs",
                                              tabPosition:"top",
                                              tabStrip:true,
                                              nested : true,
                                              style : "min-height: 550px;overflow:auto;"
                                            },
                                            "patientHistoryTabs"
                                            );
          historyTab.addChild(historyTabs);
            var socialHistoryTab = new ContentPane({id:"patientSocialHistoryTab",
                                              title:"Social"
                                              },
                                              "patientSocialHistoryTab"
                                              );
            historyTabs.addChild(socialHistoryTab);
            var familyHistoryTab = new ContentPane({id:"patientFamilyHistoryTab",
                                              title:"Family"
                                              },
                                              "patientFamilyHistoryTab"
                                              );
            historyTabs.addChild(familyHistoryTab);
            var medicalAndSurgicalHistoryTab = new ContentPane({id:"patientMedicalAndSurgicalHistoryTab",
                                              title:"Medical & Surgical"
                                              },
                                              "patientMedicalAndSurgicalHistoryTab"
                                              );
            historyTabs.addChild(medicalAndSurgicalHistoryTab);
  
        var preventiveHealthTab = new ContentPane({id:"patientPreventiveHealthTab",
                                                  title:"Preventives"
                                                  },
                                                  "patientPreventiveHealthTab"
                                                  );
        tabs.addChild(preventiveHealthTab);
          var preventiveHealthTabs = new TabContainer({id:"patientPreventiveTabs",
                                                        tabPosition:"top",
                                                        tabStrip:true,
                                                        nested : true,
                                                        style : "min-height: 550px;overflow:auto;"
                                                    },
                                                    "patientPreventiveTabs"
                                                    );
          preventiveHealthTab.addChild(preventiveHealthTabs);

            var patientImmunisationTab = new ContentPane({id:"patientImmunisationTab",
                                                      title:"Immunisation"
                                                      },
                                                      "patientImmunisationTab"
                                                      );
            preventiveHealthTabs.addChild(patientImmunisationTab);
/*
            var patientObstetricsPreventivesTab = new ContentPane({id:"patientObstetricsPreventivesTab",
                                                        title:"Obstetrics"
                                                        },
                                                        "patientObstetricsPreventivesTab"
                                                        );
            preventiveHealthTabs.addChild(patientObstetricsPreventivesTab);


              var patientObstetricsHistoryDetail = new ContentPane({id:"obstetric_history_detail",
                                                          },
                                                          "obstetric_history_detail"
                                                          );
              patientObstetricsPreventivesTab.addChild(patientObstetricsHistoryDetail);
  
            var patientGynaecologyPreventivesTab = new ContentPane({id:"patientGynaecologyPreventivesTab",
                                                        title:"Gynaecology"
                                                        },
                                                        "patientGynaecologyPreventivesTab"
                                                        );
            preventiveHealthTabs.addChild(patientGynaecologyPreventivesTab);

            var patientMedicalPreventivesTab      = new ContentPane({id:"patientMedicalPreventivesTab",
                                                        title:"Medical & Surgical",
                                                        disabled: true
                                                        },
                                                        "patientMedicalPreventivesTab"
                                                        );
            preventiveHealthTabs.addChild(patientMedicalPreventivesTab);

            var patientNeonatalAndPaediatricTab = new ContentPane({id:"patientNeonatalAndPaediatricExamTab",
                                                        title:"Neonatal & Paediatric",
                                                        disabled: true
                                                        },
                                                        "patientNeonatalAndPaediatricExamTab"
                                                        );
            preventiveHealthTabs.addChild(patientNeonatalAndPaediatricTab);
*/
        /*
        var medicationAndAllergiesTab = new ContentPane({id:"patientMedicationListAndAllergiesTab",
                                                        title:"Medications & Allergies"
                                                        },
                                                        "patientMedicationListAndAllergiesTab"
                                                        );
        tabs.addChild(medicationAndAllergiesTab);
        */
        /*
        var admissionAndVisitTab      = new ContentPane({id:"patientAdmissionAndVisitsTab",
                                                        title:"Admissions & Visits"
                                                        },
                                                        "patientAdmissionAndVisitsTab"
                                                        );
        tabs.addChild(admissionAndVisitTab);
        */
        /*
        var mediaTab                 = new ContentPane({id:"patientMediaTab",
                                                        title:"Media"
                                                        },
                                                        "patientMediaTab"
                                                        );
        tabs.addChild(mediaTab);
        */

      mainContainer.startup();
			mainContainer.resize();

     mainBorderContaner.resize();
     patientSynopsisBorderContainer.resize();
     registry.byId("centerMainPane").resize();


/*
    require(["dijit/registry","dojo/dom-style","dojo/on"],
      function(registry, domStyle,on){
        var tab = registry.byId('patientSynopsisBottomTabContainer');
        var tabList = tab.tablist;
        console.log(tabList);
        console.log(tabList.domNode.childNodes);

        domStyle.set(tabList.domNode.children[2] ,
                    {"position": "relative",
                    "float"    : "right",
                    "top"     : "0",
                    "border"  : "medium none"
                    }
        );
        registry.byId('patientSynopsisBottomContentPaneContact').onShow = function(){
                      domStyle.set(tabList.domNode.children[2] ,
                                      {"position": "relative",
                                        "float"   : "right",
                                        "top"    : "0.4em",
                                        "borderBottom":"solid medium #CFE5FA"
                                        }
                      );
                      this.resize();
        }
        registry.byId('patientSynopsisBottomContentPaneContact').onHide = function(){
                      domStyle.set(tabList.domNode.children[2] ,
                                      {"position": "relative",
                                        "float"   : "right",
                                        "top"    : "0",
                                        "borderBottom":"medium none"
                                        }
                      );
                      
        }
      }
   );
*/

//{% comment %}

//{% if perms.admission.add_admissiondetail %}
    var addAdmissionButton =  new Button({
                                        label: "Add",
                                        title:"Add New Admission",
                                        iconClass: "dijitIconNewTask",
                                        onClick: function(){
                                               require(
                                                ["dojo/_base/xhr", "dojo/_base/array"],
                                                function(xhr, array){
                                                  //var gridRow    = grid.selection.getSelected();
                                                  //var id = grid.store.getValue(gridRow[0], 'id');
                                                  xhr.get({
                                                    url: "{%url admission_json %}"+
                                                          "?patient_id="+
                                                          dom.byId("selected_patient_id_info").innerHTML +
                                                          "&action=add",
                                                    load: function(html){
                                                               var myDialog = dijit.byId("editPatientDialog");
                                                               myDialog.set('content', html);
                                                               myDialog.set('title',
                                                                            "Record New Admission to the Clinic ");
                                                               myDialog.show();
                                                          }
                                                 });
                                               })
                                        }
                                      },
                                      domConstruct.create('button',
                                                          {type : "button",
                                                           id   : "addAdmissionButton"
                                                          },
                                                          "admission_list_container",
                                                          "first"
                                      )
);
//{% endif %}

//{% if perms.visit.add_visitdetail %}
    var addVisitButton =  new Button({
                                    label: "Add",
                                    title: "Add New OPD Visit",
                                    iconClass: "dijitIconNewTask",
                                    onClick: function(){
                                           require(
                                            ["dojo/_base/xhr", "dojo/_base/array"],
                                            function(xhr, array){
                                              xhr.get({
                                                url: "{%url visit_json %}"+
                                                     "?patient_id="+
                                                     dom.byId("selected_patient_id_info").innerHTML +
                                                     "&action=add",
                                                load: function(html){
                                                           var myDialog = dijit.byId("editPatientDialog");
                                                           myDialog.set('content', html);
                                                           myDialog.set('title', " Record New Out Patient Visit ");
                                                           myDialog.show();
                                                      }
                                             });
                                           })
                                    }
                         },
                         domConstruct.create('button',
                                              {type : "button",
                                               id   : "addVisitButton"
                                              },
                                              "visit_list_container",
                                              "first"
                         )
  );
//{% endif %}

//{% endcomment %}

//{% if perms.patient %}
    var addAllergyButton =  new Button({
                                      label: "Add",
                                      title: "Add Allergy Details",
                                      iconClass: "dijitIconNewTask",
                                      style    :"position:relative; top: 0; left: 0;",
                                      onClick: function(){
                                             require(
                                              ["dojo/_base/xhr", "dojo/_base/array"],
                                              function(xhr, array){
                                                xhr.get({
                                                  url: "{% url allergies_json %}"+
                                                       "?patient_id="+
                                                       dom.byId("selected_patient_id_info").innerHTML +
                                                       "&action=add",
                                                  load: function(html){
                                                             var myDialog = dijit.byId("editPatientDialog");
                                                             myDialog.set('content', html);
                                                             myDialog.set('title', "Record New Allergy Details");
                                                             myDialog.show();
                                                        }
                                               });
                                             })
                                      }
                         },
                        domConstruct.create('button',
                                            {type : "button",
                                             id   : "addAllergyButton"
                                            },
                                            "allergy_list",
                                            "before"
                        )
);
//{% endif %}

//{% if perms.patient %}
    var addPatientImmunisationButton =  new Button({
                                          label: "Add",
                                          title: "Add Immunisation Details",
                                          iconClass: "dijitIconNewTask",
                                          onClick: function(){
                                                 require(
                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                  function(xhr, array){
                                                    xhr.get({
                                                      url: "{%url immunisation_json %}"+
                                                           "?patient_id="+
                                                           dom.byId("selected_patient_id_info").innerHTML +
                                                           "&action=add",
                                                      load: function(html){
                                                                 var myDialog = dijit.byId("editPatientDialog");
                                                                 myDialog.set('content', html);
                                                                 myDialog.set('title', "Record New Immunisation Details");
                                                                 myDialog.show();
                                                            }
                                                   });
                                                 })
                                          }
                                       },
                                      domConstruct.create('button',
                                                          {type : "button",
                                                           id   : "addPatientImmunisationButton"
                                                          },
                                                          "immunisation_list",
                                                          "before"
                                      )
);
//{% endif %}

//{% if perms.patient %}
    var addPatientFamilyHistoryButton =  new Button({
                                          label       : "Add",
                                          title       : "Add Family History Details",
                                          iconClass   : "dijitIconNewTask",
                                          onClick: function(){
                                                 require(
                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                  function(xhr, array){
                                                    xhr.get({
                                                      url: "{%url family_history_json %}"+
                                                           "?patient_id="+
                                                           dom.byId("selected_patient_id_info").innerHTML +
                                                           "&action=add",
                                                      load: function(html){
                                                                 var myDialog = dijit.byId("editPatientDialog");
                                                                 myDialog.set('content', html);
                                                                 myDialog.set('title', "Record New Family History Details");
                                                                 myDialog.show();
                                                            }
                                                   });
                                                 })
                                          }
                         },
                         domConstruct.create('button',
                                            {type : "button",
                                             id   : "addPatientFamilyHistoryButton"
                                            },
                                            "family_history_list",
                                            "before"
                         )
);


//{% endif %}

//{% if perms.patient %}
    var addPatientMedicalHistoryButton =  new Button({
                                          label       : "Add",
                                          title       : "Add Medical History Details",
                                          iconClass   : "dijitIconNewTask",
                                          onClick: function(){
                                                 require(
                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                  function(xhr, array){
                                                    xhr.get({
                                                      url: "{%url medical_history_json %}"+
                                                           "?patient_id="+
                                                           dom.byId("selected_patient_id_info").innerHTML +
                                                           "&action=add",
                                                      load: function(html){
                                                                 var myDialog = dijit.byId("editPatientDialog");
                                                                 myDialog.set('content', html);
                                                                 myDialog.set('title', "Record New Medical History Details");
                                                                 myDialog.show();
                                                            }
                                                   });
                                                 })
                                          }
                         },
                         domConstruct.create('button',
                                            {type : "button",
                                             id   : "addPatientMedicalHistoryButton"
                                            },
                                            "medical_history_list",
                                            "before"
                         )
);


//{% endif %}

//{% if perms.patient %}
    var addPatientSurgicalHistoryButton =  new Button({
                                          label       : "Add",
                                          title       : "Add Surgical History Details",
                                          iconClass   : "dijitIconNewTask",
                                          onClick: function(){
                                                 require(
                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                  function(xhr, array){
                                                    xhr.get({
                                                      url: "{%url surgical_history_json %}"+
                                                           "?patient_id="+
                                                           dom.byId("selected_patient_id_info").innerHTML +
                                                           "&action=add",
                                                      load: function(html){
                                                                 var myDialog = dijit.byId("editPatientDialog");
                                                                 myDialog.set('content', html);
                                                                 myDialog.set('title', "Record New Surgical History Details");
                                                                 myDialog.show();
                                                            }
                                                   });
                                                 })
                                          }
                         },
                         domConstruct.create('button',
                                            {type : "button",
                                             id   : "addPatientSurgicalHistoryButton"
                                            },
                                            "surgical_history_list",
                                            "before"
                         )
);

//{% endif %}


//{% if perms.patient %}
    var addPatientMedicationListButton =  new Button({
                                          label: "Add",
                                          title : "Add New Medication List",
                                          iconClass: "dijitIconNewTask",
                                          onClick: function(){
                                                 require(
                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                  function(xhr, array){
                                                    xhr.get({
                                                      url: "{%url medication_list_json%}"+
                                                           "?patient_id="+
                                                           dom.byId("selected_patient_id_info").innerHTML +
                                                           "&action=add",
                                                      load: function(html){
                                                                 var myDialog = dijit.byId("editPatientDialog");
                                                                 myDialog.set('content', html);
                                                                 myDialog.set('title', "Record Medication Details");
                                                                 myDialog.show();
                                                            }
                                                   });
                                                 })
                                          }
                         },
                        domConstruct.create('button',
                                            {type : "button",
                                             id   : "addPatientMedicationListButton"
                                            },
                                            "medication_list",
                                            "before"
                        )
);
//{% endif %}

//{% comment %}
//{% if perms.patient %}
    var addPatientMediaButton =  new Button({
                                          label: "Add",
                                          title : "Add Patient Media Attachements",
                                          iconClass: "dijitIconNewTask",
                                          onClick: function(){
                                                 require(
                                                  ["dojo/_base/xhr", "dojo/_base/array"],
                                                  function(xhr, array){
                                                    xhr.get({
                                                      url: "/AuShadha/pat/media/"+
                                                           "?patient_id="+
                                                           dom.byId("selected_patient_id_info").innerHTML +
                                                           "&action=add",
                                                      load: function(html){
                                                                 var myDialog = dijit.byId("editPatientDialog");
                                                                 myDialog.set('content', html);
                                                                 myDialog.set('title', "Add Patient Media");
                                                                 myDialog.show();
                                                            }
                                                   });
                                                 })
                                          }
                                  },
                                  domConstruct.create('button',
                                                      {type : "button",
                                                       id   : "addPatientMediaButton"
                                                      },
                                                      "patientMediaTab",
                                                      "first"
                                  )
);
//{% endif %}
//{% endcomment %}
    }

   });
  //});

}
