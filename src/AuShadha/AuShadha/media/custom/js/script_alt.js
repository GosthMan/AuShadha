      require([
              "dojo/dom",
              "dojo/_base/xhr",
              "dojo/parser",
              "dojox/grid/DataGrid",
              "dojo/store/JsonRest",
              "dojox/data/JsonRestStore",
              "dojo/data/ObjectStore",
              "dojo/on",
              "dijit/registry",
              "dijit/Dialog",
              "dojo/ready",
              "dojo/_base/array",
              "dojo/dom-construct",
              "dojo/dom-style",
              "dojox/layout/ContentPane",
              "dojo/behavior",
              "dojo/store/Memory",
              "dojo/dom-geometry",
              "dojo/request",
//               "../../custom/js/stores.js",

              "dojo/_base/connect",
              "dojo/on",
              "dijit/TitlePane",
              "dijit/layout/TabContainer",
              "dijit/layout/BorderContainer",
              "dijit/layout/SplitContainer",
              "dijit/Editor",
              "dijit/form/Form",
              "dijit/form/Button",
              "dijit/form/TextBox",
              "dijit/form/ValidationTextBox",
              "dijit/form/Textarea",
              "dijit/form/SimpleTextarea",
              "dijit/form/DateTextBox",
              "dijit/form/TimeTextBox",
              "dijit/form/NumberTextBox",
              "dijit/form/Select",
              "dijit/form/MultiSelect",
              "dijit/form/FilteringSelect",
              "dojox/form/Manager",
              "dojox/validate/web",
              "dijit/Menu",
              "dijit/Tooltip",
              "dijit/MenuBar",
              "dijit/PopupMenuBarItem",
              "dijit/DropDownMenu",
              "dijit/MenuItem",
              "dojo/data/ItemFileWriteStore",
              "dojox/data/QueryReadStore",
              "dijit/Tree",
              "dojo/store/Observable",
              "dojox/layout/GridContainer",
              "dojox/widget/Portlet",
              "dojox/widget/FeedPortlet",
              //"dojox/widget/ExpandableFeedPortlet",
              "dojox/widget/PortletSettings",
              "dojox/widget/Calendar",
              "dijit/dijit",
              "dojox/widget/Toaster",

              "dojo/domReady!"
      ],
      function(dom, 
               xhr, 
               parser      , 
               DataGrid,
               JsonRest, 
               JsonRestStore, 
               ObjectStore , 
               on,
               registry, 
               Dialog      , 
               ready,
               array   , 
               domConstruct,
               domStyle, 
               ContentPane,
               behaviour, 
               Memory, 
               domGeom, 
               request //,
//                storesModule
              )
      {

    // Define Variables to be used later in the app..
    console.log("Starting script script.js");
    
    // STORES;
    var myStore;

    function setupPatientGrid(){
        patientStore = new JsonRest({target:"/AuShadha/pat/list/", idProperty: 'id'});
        grid    = new DataGrid({
                  store         : dataStore = ObjectStore({objectStore: patientStore}),
                  query         : { search_field: 'id', search_for: "*" },
                  clientSort    : true,
                  autoWidth     : true,
                  selectionMode : "single",
                  rowSelector   : "20px",
                  structure     : GRID_STRUCTURES.PATIENT_GRID,
                  noDataMessage: "<span class='dojoxGridNoData'>No Matching Patients</span>"
                  },
                "patient_grid"
        );
        grid.startup();
        grid.canSort = function(){ return true;};
        grid.onRowClick = function(e) {
                                /*
                                   Get the Clicked Rows index and the Grid item from that
                                   Fetch the Item in the Store so that the patient ID is
                                   retrieved.
                                */
                                var idx    = e.rowIndex,
                                    item   = this.getItem(idx);

                                console.log(item);
                                CHOSEN_PATIENT = item.addData;
                                var addData  = item.addData;
                                renderGridsFormsAndTrees(addData);
								/*
                                   Clear the current Grid selection
                                   Set the new selected Row
                                */
                                grid.selection.clear();
                                grid.selection.setSelected(item, true);

								var mainTabContainer = registry.byId('centerTopTabPane');
                                var patientListTab   = registry.byId('patientHomeContentPane');
                                mainTabContainer.selectChild(patientListTab);
                return false;
        };

    grid.onRowDblClick = function(e){
            //{% if perms.patient.change_patientdetail or perms.patient.delete_patientdetail %}
                          var idx = e.rowIndex,
                              item = this.getItem(idx);
                          var patid = this.store.getValue(item, "id");
                          var edit  = this.store.getValue(item, "edit");
                          var del   = this.store.getValue(item, "del");
                          var visitadd      = this.store.getValue(item, "visitadd");
                          var admissionadd  = this.store.getValue(item, "admissionadd");
                          if( e.cell.field == 'home'){
                              e.cell.loadTab();
                          }
                          else{
                              grid.selection.clear();
                              grid.selection.setSelected(item, true);
                              xhr.get({
                                      url  : edit,
                                      load : function(html, idx){
                                                var myDialog = dijit.byId("editPatientDialog");
                                                if(myDialog == undefined || myDialog == null){
                                                  myDialog = new dijit.Dialog({
                                                                      title: "Edit Patient",
                                                                      content: html,
                                                                      style: "width: 500px; height:500px;"
                                                                      },
                                                                      "editPatientDialog"
                                                  );
                                                  myDialog.startup();
                                                }
                                                else{
                                                  myDialog.set('content', html);
                                                  myDialog.set('title', "Edit Patient");
                                                }
                                                myDialog.show();
                                      }
                            })
                          }
          //{% endif %}
                         return false;
            };
    }

  console.log("Calling setupPatientGrid");
  setupPatientGrid();
  console.log("setupPatientGrid Returned");

  function addNewPatient(){
    require(["dojo/_base/xhr",
            "dijit/registry",
            "dijit/Dialog"
    ],
    function(xhr, registry, Dialog){
      var myDialog = dijit.byId("editPatientDialog");
      xhr.get({
              url: "{%url patient_new_add %}",
              load: function(html){
                      myDialog.set('content', html);
                      myDialog.set('title', "Enroll New Patient to the Clinic");
                      myDialog.show();
              }
      });
    });
  }

//{% if perms.patient.add_patientdetail %}
    var addPatientButton =  new dijit.form.Button({
                                              label: "New",
                                              iconClass:"addPatientIcon_32",
                                              onClick: function(){
                                                            addNewPatient();
                                              }
                                            },
                                            "addPatientButton"
    );

   require(["dojo/on","dojo/dom"],
          function(on,dom){
              on(dom.byId("addPatientButtonSmall"),
                          "click",
                          function(){
                              addNewPatient();
                          }
              );
          }
  );
//{% endif %}


  //genericFormBehaviour();

    var patientIdStore = new JsonRest({
            target     : "{%url patient_id_autocompleter %}",
            idProperty : 'patient_id'
        });

    var patientHospitalIdStore = new JsonRest({
            target     : "{%url patient_hospital_id_autocompleter  %}",
            idProperty : 'patient_id'
        });

    var patientNameStore = new JsonRest({
            target     : "{%url patient_name_autocompleter %}",
            idProperty : 'patient_id'
        });


    var patientHospitalIdSelect = new dijit.form.FilteringSelect({
        label        : "Search Patient ID: ",
        name         : "patientHospitalIdAutoCompleter",
        store        : patientHospitalIdStore,
        autoComplete : false,
        required     : true,
        placeHolder  : "Search Patient ID.",
        hasDownArrow : true,
        style        : "width: 175px; margin-left: 20px;",
        searchAttr   : "patient_hospital_id",
        labelAttr    : "name",
        onChange     : function(patient_hospital_id){
                        console.log("You chose " + this.item.patient_hospital_id)
                        console.log("You chose Patient: " + this.item.patient_name)
                        if(this.item == false){
                          dojo.attr( dojo.byId("patientSearchFormSubmitBtn"),
                                     'disabled',
                                     'disabled'
                          )
                        }
                        if(this.item){
                          dojo.attr( dojo.byId("patientSearchFormSubmitBtn"),'disabled','')
                          console.log(patientHospitalIdStore)
                          console.log(this.item.patient_hospital_id)
                          var queryItem = patientHospitalIdStore.
                                               query({"patient_hospital_id":
                                                       this.item.patient_hospital_id}
                                               )
                          var get_name    = this.item.patient_name+""
                          var patNameItem = patientNameStore.
                                               query({"patient_name" : this.item.patient_name ,
                                                      "patient_id"   : this.item.patient_id
                                               });
                          dijit.byId("patientNameSelection").
                                set('displayedValue', this.item.patient_name);
                          var patient_id = this.item.patient_id;
                          var searchedPatientId = myStore.query({'patient_id': patient_id});
                          grid.filter({id: patient_id }, true);
                          console.log(searchedPatientId);
//                            alert(searchedPatientId.results )
//                            var myStorePatient = grid.store.fetchItemByIdentity({"patient_id":patient_id})
//                            console.log(myStorePatient)
                        }
                      }
    },
   "patientHospitalIdSelection"
   );

  patientHospitalIdSelect.startup();


  var patientNameSelect = new dijit.form.FilteringSelect({
      label        : "Search Patient Name ",
      name         : "patientNameAutoCompleter",
      store        : patientNameStore,
      autoComplete : false,
      required     : true,
      placeHolder  : "Search Patient Name",
      hasDownArrow : true,
      labelAttr    : "patient_name",
      style        : "width: 175px; margin-left: 20px;",
      searchAttr   : "patient_name",
      onChange     : function(patient_name){
//                            alert("You chose " + this.item.patient_hospital_id)
                      if(this.item){
//                              alert(this.item.patient_id)
                        var queryItem = patientHospitalIdStore.
                                         query({ 'patient_hospital_id':
                                                 this.item.patient_hospital_id
                                         });

                        dijit.byId("patientHospitalIdSelection").
                         set('displayedValue', this.item.patient_hospital_id);
/*
                        dijit.byId("patientIdSelection").
                         set('displayedValue', queryItem.patient_hospital_id);
*/
                      }
                    }
  },
  "patientNameSelection"
  );

  patientNameSelect.startup();

  console.log("Finished running script script.js");

});




/* GENERIC CRUD FUNCTION FOR FORM SUBMISSION - ADDING, EDITING, DELETING */


/*
Raise an Invalid Form Submission Dialog and return false
*/
function raiseInvalidFormSubmission(){
  require(["dijit/registry"], function(registry){
           registry.byId("invalidFormSubmissionErrorDialog").show();
           return false;
         });
  return false;
}


/*
Raise an Permission Denied Dialog and return false
*/
function raisePermissionDenied(){
  require(["dijit/registry"], function(registry){
           registry.byId("permissionDeniedErrorDialog").show();
           return false;
         });
  return false;
}




/*
  A generic function to do an adding of all Items and update the div / grid accordingly
  to call it with the URL , the Form's dojo-id and the grid to update and add the row to
  We are assuming that the server returns a JSON with json.addData so that the row can be
  updated.
*/
function addItem(url,form_id,grid_id){
  require(["dojo/dom",
           "dojo/request/xhr",
           "dijit/registry"  ,
           "dojo/json"       ,
           "dojo/dom-form"   ,
           "dijit/Dialog"
  ],
  function(dom, xhr, registry, JSON, domForm, Dialog){
    var editDialog  = registry.byId("editPatientDialog");
    var errorDialog = registry.byId("dialogJsonMessage");
    xhr(url,{
         handleAs: "text",
         method  : "POST",
         data    : domForm.toObject(form_id)
    }).then(
       function(json){
          var jsondata = JSON.parse(json)
          console.log(jsondata);
          if(jsondata.success == true){
            dom.byId(form_id).reset();
            var data = jsondata.addData;
            registry.byId(grid_id).store.newItem(data);
            publishInfo("Saved Successfully" );
            if(ADD_MORE_ITEMS == false){
              editDialog.hide();
            }
            else{
              registry.byId(form_id).focus();
            }
          }
          else{
            errorDialog.set("title", "ERROR");
            errorDialog.set("content", jsondata.error_message);
            errorDialog.show();
            publishError("ERROR ! :" + jsondata.error_message );
          }
       },
       function(json){
            var jsondata = JSON.parse(json);
            errorDialog.set("title", "ERROR");
            errorDialog.set("content", jsondata.error_message);
            errorDialog.show();
            publishError("ERROR!: "+ jsondata.error_message );
       },
       function(evt){console.log("Adding Data Finished Successfully...")}
    );
  });
}



/*
  A generic function to do an update of all Items and update the div / grid accordingly
  to call it with the URL , the Form's dojo-id and the grid to update and re-render
*/
function editItem(url,form_id,grid_id){
  require(["dojo/request/xhr",
           "dijit/registry"  ,
           "dojo/json"       ,
           "dojo/dom-form"   ,
           "dijit/Dialog"
  ],
  function(xhr,registry,JSON, domForm, Dialog){
    var editDialog  = registry.byId("editPatientDialog");
    var errorDialog = registry.byId("dialogJsonMessage");
    xhr(url,{
         handleAs: "text",
         method  : "POST",
         data    : domForm.toObject(form_id)
    }).
    then(
       function(json){
          var jsondata = JSON.parse(json)
          console.log(jsondata);
          if(jsondata.success == true){
            registry.byId(grid_id).render();
            editDialog.hide();
            publishInfo(jsondata.error_message);
          }
          else{
            errorDialog.set("title", "ERROR");
            errorDialog.set("content", jsondata.error_message);
            errorDialog.show();
          }
       },
       function(json){
            var jsondata = JSON.parse(json);
            errorDialog.set("title", "ERROR");
            errorDialog.set("content", jsondata.error_message);
            errorDialog.show();
            publishError("ERROR in Server.. Please retry.");
       },
       function(evt){
            console.log("Update Actions Finished Successfully...")
            publishInfo("Update Actions Finished Successfully...");
       }
    );
  });
}

/*
 Generic Delete Function
 Gets the URL to call and the Grid to update as the arguments.
*/

function delItem(url,grid_id){
  require(["dojo/dom",
             "dojo/request/xhr",
             "dojo/json",
             "dijit/registry",
             "dijit/Dialog"
  ],
  function(dom, xhr, JSON, registry, Dialog){
    xhr(url,{method: "GET", handleAs:"text" }).
    then(
      function(json){
        var jsondata = JSON.parse(json)
        if (jsondata.success == true){
          registry.byId("editPatientDialog").hide();
          registry.byId(grid_id).render();
          registry.byId(grid_id).selection.clear();
          publishInfo("Successfully Deleted ..");
        }
        else{
         var errorDialog = registry.byId('dialogJsonMessage');
         errorDialog.set('title', "ERROR!");
         errorDialog.set('content', jsondata.error_message);
         errorDialog.show();
        }
      },
      function(json){
        console.log("ERROR in Server.. Please retry.");
        publishError("ERROR in Server.. Please retry.");
      },
      function(evt){
        console.log("Deleting Item Complete")
      }
    );
  });
}