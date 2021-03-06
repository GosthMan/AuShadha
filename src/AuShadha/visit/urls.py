from django.conf.urls.defaults import *

import AuShadha.settings
from visit.views import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    url(r'render_visit_list/$'  , render_visit_list  , name="render_visit_list"),
    url(r'render_visit_tree/$'  , render_visit_tree  , name="render_visit_tree"),
    #url(r'render_visit_json/(?P<id>\d+)/$'  , render_visit_json  , name="render_visit_json"),

    url(r'summary/(?P<id>\d+)/$'    ,  visit_summary     , name="visit_summary"),
    
    url(r'detail/add/(?P<id>\d+)/$'  , visit_detail_add  , name="visit_detail_add"),
    url(r'add/(?P<id>\d+)/$'         , visit_detail_add  , name="visit_detail_add"),
    
    url(r'detail/list/(?P<id>\d+)/$' , visit_detail_list , name="visit_detail_list"),
    url(r'list/(?P<id>\d+)/$'        , visit_detail_list , name="visit_detail_list"),
    
    url(r'detail/edit/(?P<id>\d+)/$' , visit_detail_edit , name="visit_detail_edit"),
    url(r'edit/(?P<id>\d+)/$'        , visit_detail_edit , name="visit_detail_edit"),
    
    url(r'detail/del/(?P<id>\d+)/$'  , visit_detail_del  , name="visit_detail_del"),
    url(r'del/(?P<id>\d+)/$'         , visit_detail_del  , name="visit_detail_del"),

    #url(r'complaint/add/(?P<id>\d+)/$'  , visit_complaint_add  , name="visit_complaint_add"),
    #url(r'complaint/list/(?P<id>\d+)/$' , visit_complaint_list , name="visit_complaint_list"),
    #url(r'complaint/edit/(?P<id>\d+)/$' , visit_complaint_edit , name="visit_complaint_edit"),
    #url(r'complaint/del/(?P<id>\d+)/$'  , visit_complaint_del  , name="visit_complaint_del"),

    #url(r'hpi/add/(?P<id>\d+)/$'  , visit_hpi_add  , name="visit_hpi_add"),
    #url(r'hpi/list/(?P<id>\d+)/$' , visit_hpi_list , name="visit_hpi_list"),
    #url(r'hpi/edit/(?P<id>\d+)/$' , visit_hpi_edit , name="visit_hpi_edit"),
    #url(r'hpi/del/(?P<id>\d+)/$'  , visit_hpi_del  , name="visit_hpi_del"),

    #url(r'past_history/add/(?P<id>\d+)/$'  , visit_past_history_add  , name="visit_past_history_add"),
    #url(r'past_history/list/(?P<id>\d+)/$' , visit_past_history_list , name="visit_past_history_list"),
    #url(r'past_history/edit/(?P<id>\d+)/$' , visit_past_history_edit , name="visit_past_history_edit"),
    #url(r'past_history/del/(?P<id>\d+)/$'  , visit_past_history_del  , name="visit_past_history_del"),

    #url(r'imaging/add/(?P<id>\d+)/$'  , visit_imaging_add  , name="visit_imaging_add"),
    #url(r'imaging/list/(?P<id>\d+)/$' , visit_imaging_list , name="visit_imaging_list"),
    #url(r'imaging/edit/(?P<id>\d+)/$' , visit_imaging_edit , name="visit_imaging_edit"),
    #url(r'imaging/del/(?P<id>\d+)/$'  , visit_imaging_del  , name="visit_imaging_del"),

    #url(r'inv/add/(?P<id>\d+)/$'  , visit_inv_add  , name="visit_inv_add"),
    #url(r'inv/list/(?P<id>\d+)/$' , visit_inv_list , name="visit_inv_list"),
    #url(r'inv/edit/(?P<id>\d+)/$' , visit_inv_edit , name="visit_inv_edit"),
    #url(r'inv/del/(?P<id>\d+)/$'  , visit_inv_del  , name="visit_inv_del"),

    #url(r'phyexam/add/(?P<id>\d+)/$'  , visit_phyexam_add  , name="visit_phyexam_add"),
    #url(r'phyexam/list/(?P<id>\d+)/$' , visit_phyexam_list , name="visit_phyexam_list"),
    #url(r'phyexam/edit/(?P<id>\d+)/$' , visit_phyexam_edit , name="visit_phyexam_edit"),
    #url(r'phyexam/del/(?P<id>\d+)/$'  , visit_phyexam_del  , name="visit_phyexam_del"),

    #url(r'(?P<exam_to_add>\w+)/add/(?P<id>\d+)/$'  ,exam_add , exam_add_with_id"),
    #url(r'(?P<exam_to_add>\w+)/add/$'  ,exam_add , exam_add_without_id"),

    #url(r'phyexam/add/(?P<id>\d+)/$'  , visit_phyexam_add  , name="visit_phyexam_add"),
    #url(r'phyexam/list/(?P<id>\d+)/$' , visit_phyexam_list , name="visit_phyexam_list"),
    #url(r'phyexam/edit/(?P<id>\d+)/$' , visit_phyexam_edit , name="visit_phyexam_edit"),
    #url(r'phyexam/del/(?P<id>\d+)/$'  , visit_phyexam_del  , name="visit_phyexam_del"),


    #url(r'close/(?P<id>\d+)/$'       , visit_close       , name="visit_close"),

)

 
