var slider1 = null,currentSamplepage=undefined, slider2 = null, oldthemepath = null, SamplesList = null, editcontrolpath = null, selthemecolor = null, cssheight = null; window.theme = "azure", minScrollerHeight = 550;
window.themecolor = ""; window.themestyle = ""; window.themevarient = "";

$(function () {
    var sbModel = new ViewModel(), isloadLeft = false;

    window.Path && Path.map("#!/:theme/:control(/:category1)(/:category2)(/:category3)").to(function () {
        var control = "", categories = [], currentSample, theme = "";
        for (var prop in this.params) {
            if (prop === "theme") {
                window.theme = this.params[prop];
                continue;
            }
            else if (prop === "control") {
                control = this.params[prop];
                continue;
            }
            categories.push(this.params[prop]);
        }

        if (window.theme.indexOf("dark") != -1)
            $(document.body).addClass("darktheme");

        currentSample = categories.pop();
        if (control !== "")
            loadSamplePage(control, currentSample, categories);
        updateSBTheme();
    });
	$.views.converters("ensureURL", function(val) {
	  return val.toLowerCase();
	});
	$.views.converters("Upperstring", function(val) {
	  return val.toUpperCase();
	});
	$.views.converters("RemoveWhiteSpace", function(val) {
	  return val.replace(/ /g, "") ;
	});
    var updateSBTheme = function () {
        if (window.location.hash.indexOf("lime") != -1) {
            $(".htmljssamplebrowser").attr("class", "htmljssamplebrowser " + "lime");
            $("#themebutton").ejButton('option', 'prefixIcon', 'e-icons ' + "lime");
        }
        else if (window.location.hash.indexOf("saffron") != -1) {
            $(".htmljssamplebrowser").attr("class", "htmljssamplebrowser " + "saffron");
            $("#themebutton").ejButton('option', 'prefixIcon', 'e-icons ' + "saffron");
        }
        else if (window.location.hash.indexOf("bootstrap") != -1) {
            $(".htmljssamplebrowser").attr("class", "htmljssamplebrowser " + "azure");
            $("#themebutton").ejButton('option', 'prefixIcon', 'e-icons ' + "azure");            
        }
    };
    var loadSamplePage = function (control, currentSample, categories) {

        if (control == null) {
            $("#samplesDiv").css("display", "none");
            $(".samples").css("display", "none");
            $("#samplefile").attr('src', 'about:blank');
            self.loadSBMainPage(null);
            return;
        }

        var sample = findSample(control, currentSample, categories), name = sample, parentId = null;

        while (name.samples) {
            if (name.samples) {
                parentId = parseInt(name.id) ? name.id : null;
                window.sample = name = name.samples[0];
                currentSample = name.querystring;
            } else
                break;
        }

        self.removeSelectedItemcss(control, name.id);

        if ($("#sbtooltipbox").data("ejDialog"))
            $("#sbtooltipbox").ejDialog("close");

        if (isloadLeft || Number(name.id) <= 1)
            self.loadLeftTab(control, currentSample);
        if (control == "angularsupport" || control == "knockout") var sampleurl = currentSample + "/" + control + ".html";		   
        else var sampleurl = control + "/" + currentSample + ".html";		    
        self.loadSamplePage(sampleurl, control, currentSample, parentId, name.id);
        setTimeout("updateHeight()", 200);
    };

    var findSample = function (control, currentSample, categories) {
        var sample = ej.Query().using(ej.DataManager(SamplesList)).where("id", "==", control,true), current = sample, res;

        for (var k = 0; k < categories.length; k++) {
            current.hierarchy((current = ej.Query("samples").where("url", "==", categories[k],true)));
        }

        if (currentSample)
            current.hierarchy(ej.Query("samples").where("url", "==", currentSample,true));

        res = sample.executeLocal();

        if (res.length) res = res[0];
        return res;
    };
$("#Res-prodnav").on("click",function (e) {
	if($(window).width()<900&& !($(this).hasClass("selectIt")) && $(".product-naviation").hasClass("hideIt"))
	$(this).addClass("selectIt");
	else if(!$(".product-naviation").hasClass("hideIt"))
	$(".product-naviation").removeClass("hideIt");
});
    $("#scrollcontainer").on("click", ".secondlevelload, .anchorclass", function (e) {
        var hashBang = $(e.currentTarget).attr("hashbang");
        if (hashBang) {
            var path = hashBang.replace("flat", window.theme);
            if (path != window.location.hash) {
                $('#samplefile').css('visibility', 'hidden');
				$('#sourceTab').css('visibility', 'hidden');

            }
            window.location.hash = path;
			if($(e.target).closest(".anchorclass.mainlevel").length==1)
			setTimeout(function () {$("#scrollcontainer").ejScroller({scrollTop: 0 });}, 100);	
        }
        var viewportWidth = $(window).width();
        if (viewportWidth < 981) {
            $('.content-container-fluid .row > .navigation').addClass('collapsePanel');
            $('.accordion-panel').removeClass("expandPanel");
        }
    });


    $("#themebutton").ejButton({
        size: "normal",
        width: "60px",
        height: "55px",
        cssClass: "metroblue",
        click: "themebtnClick",
        contentType: "imageonly",
        prefixIcon: "e-uiLight e-icon-handup"
    });
    $("#buybutton").ejButton({
        size: "normal",
        width: "66px",
        height: "55px",
        cssClass: "metroblue",
        contentType: "imageonly",
        prefixIcon: "e-uiLight e-icon-handup"
    });
   
    $(document).delegate(".product-naviation div", "click", function (e) {
        viewdemo(e.target.innerHTML);
    });
    $("#sbtooltipbox").ejDialog({ height: "86px", width: "176px", enableResize: false, showOnInit: false, showHeader: false, cssClass: "metroblue", allowKeyboardNavigation:false });
    $("#themeDialog").ejDialog({ height: "160px", enableResize: false, showOnInit: false, showHeader: false, cssClass: "metroblue" });
    $("#metrotext").ejRadioButton({ value: "flat", size: "medium", name: "themestyle", checked: true, cssClass: "metroblue" });
    $("#gradienttext").ejRadioButton({ cssClass: "metroblue", size: "medium", name: "themestyle" });
    $("#lighttext").ejRadioButton({ size: "medium", name: "themevarient", checked: true, cssClass: "metroblue" });
    $("#darktext").ejRadioButton({ cssClass: "metroblue", name: "themevarient", size: "medium" });
	$("#themeDialog .e-radiobtn").ejRadioButton({"change": "themeonchange"});
    $("#bootstrapcheck").ejCheckBox({ size: "small", change: "bootstraponselect" });
    themeButtonSelect();
    var metroradio = $("#JobSearch").data("ejMenu");
    var firstlevelsamples = [];

    var isContentPageLoaded = null;
    var index = 0;

    function editItem(id, back) {
        var divid = id;
        self.removeSelectedItemcss();
        url = window.location.pathname;
        $("#subsamplesDiv").hide().css("left", "250px");
//After the sample page load footer will be loaded.
        $("#footer").hide();
        $(".cols-iframe,#sourceTab").hide();
        window.location.hash = "" + "#!/" + window.theme;
        loadSamplePage();
        setTimeout(function () { refreshScroller();$("#scrollcontainer").ejScroller({scrollTop: 0 }); $("#footer").show(); }, 200);
    }
    function ViewModel() {
        this.Controls = SamplesList;
        this.controlname = "";
        this.controlName = null;
        this.sampleName = null;

        self.editSubItem = function (id, back) {
            var divid = id;
            removeSelectedItemcss();
            $("#subsamplesDiv").html('');
            $("#" + divid).css("margin-top", "0px");
            $("#subsamplesDiv").hide().css("left", "250px");
            $("#samplesDiv").css("left", "0px").show();
            $("#" + divid).show().css("visibility", "visible");
                $("#" + divid + "_back").addClass("dashboarddiv");
                $("#" + divid).children(".subsamples").find("a >div").removeClass("dashboardhover");
                $("#samplesDiv").find("#"+divid).css("left", "-250px");
                $("#samplesDiv").find("#" + divid).children(".subsamples").show();
                $("#samplesDiv").find("#"+divid).animate({ left: '0px' }, 200);
                var samplename = null, controlname = null;
                //var scroller = $("#scrollcontainer").data("ejScroller");
                //scroller.setModel({ cssClass: "metroblue" });
                //scroller.refresh();
                window.location.hash = window.location.hash.replace(/(#!\/[^\/]+)\/.+/, "$1");            
            window.location.hash = window.location.hash + "/" + divid;
            refreshScroller();
        };

        self.loadLeftTab = function (divid) {
            if ($("#" + divid).prev().length > 0) {
                $("#" + divid).css("margin-top", "0px");
            }
            $("#accordion2").css("left", "-250px");
            $("#accordion2").prev().css("display", "none");
            $("#accordion2").css("display", "none");
            $("#subsamplesDiv").css("display", "none");
            $(".samples").hide();
            $("#samplesDiv").children("#" + divid).css("display", "block");
            $("#samplesDiv").children("#" + divid).children(".subsamples").show();
            $("#samplesDiv").children("#" + divid).children(".subsamples").find("#subControls").hide();
            $("#" + divid + "_back").css("display", "block");
			$("#" + divid + "_header").css("display", "block");
            $("#samplesDiv").css("display", "block");
            $("#samplesDiv").css("margin-top", "0px");
            $("#samplesDiv").animate({ left: '0px' }, 0);
            $('html, body').animate({
                scrollTop: 0
            }, 0);
			//code for hiding subheaders
            if ($("#currentheader").length>0) 
			 $("#currentheader").remove();
                var element = $("#" + divid + "_back").clone();		
                $(element).appendTo("#dashboardheader").attr("id", "currentheader");
                $("#sbdashboard").hide();
			if($("#dashboardheader .current_control").length>0)
			$("#dashboardheader .current_control").remove();
			$($("#" + divid + "_header").clone()).insertAfter("#currentheader").addClass("current_control").attr("id","current_control");
			$("#" + divid + "_header").hide();		
            $("#" + divid + "_back").hide();
            refreshScroller();
        };


        self.findSample = function (ctrlname, samplename, subchild, currentsampleid) {
            var query = ej.Query().using(ej.DataManager(SamplesList))
                .where("id", "==", ctrlname), curr = query, res;

            if (subchild)
                query.hierarchy(
                    curr = ej.Query("samples")
                        .where("id", "==", subchild));

            curr.hierarchy(
                ej.Query("samples")
                    .where("id", "==", currentsampleid)
            );

            res = query.executeLocal();

            if (res.length) res = res[0];
            return res;

        },
        self.loadSamplePage = function (url, ctrlname, samplename, subchild, currentsampleid) {
            currentSamplepage = url;
            if ($("#auto").data("ejAutocomplete"))
                $("#auto").ejAutocomplete("clearText");
            if (!$('body').hasClass('fixedlayout')) $('body').addClass('fixedlayout');
            $(".sampleheadingtext").empty();
            var sample = self.findSample(ctrlname, samplename, subchild, currentsampleid), sampleTitle = "";

            while (sample) {
                if (sampleTitle)
                    sampleTitle += " / ";

                sampleTitle += sample.name;

                sample = sample.samples && sample.samples[0];
            }

            var names = sampleTitle.split("/"), _samplename = names.pop();
            sampleTitle = names.join("/") + "/ ";

            var sampletitleobj = ej.buildTag("div.samplename sbsamplename");
            ej.buildTag("span", sampleTitle).appendTo(sampletitleobj);
            ej.buildTag("span.sbtxt " + window.themecolor, _samplename).appendTo(sampletitleobj);
            var navigation = ej.buildTag("span.navigation-btn");
			ej.buildTag("a#newsamplewindow", {}, {}, {title:"New Window", target:"_blank"}).appendTo(navigation);
			$("<div>").addClass("windsep").appendTo(navigation);
            var prevState = ej.buildTag("span.prev", "Prev",{},{title:"Previous"}).appendTo(navigation);
            var nextstate = ej.buildTag("span.next", "Next ",{},{title:"Next"}).appendTo(navigation);
            navigation.appendTo(sampletitleobj);
            $(".cols-iframe .sampleheadingtext:first").html(sampletitleobj);
            editcontrolpath = ctrlname + "/" + samplename + ".html";
            document.title = "Essential Studio for JavaScript : " + sampleTitle.replace(/\//g, "-") + " Demo";
            index = 0;
            self.setVisibility("productpage", "cols-iframe");
            //Waiting popoup template
            $(".control-panel").ejWaitingPopup({ template: $("#sbwaitingTemplate") });
            var popupObj = $(".control-panel").ejWaitingPopup("instance");
            popupObj.maindiv.addClass("sbloadingpopup");
            popupObj.show();
            $(".sourcecodetab").hide();
            $(".prev").ejButton({
                size: "mini",
                cssClass: "metroblue",
                contentType: "imageonly",
                prefixIcon: "e-rarrowleft-2x"
            });
            $(".next").ejButton({
                size: "mini",
                cssClass: "metroblue",
                contentType: "imageonly",
                prefixIcon: "e-rarrowright-2x"
            });
            $("#newsamplewindow").ejButton({
                size: "mini",
                cssClass: "metroblue",
                contentType: "imageonly",
                prefixIcon:"newwindow "
            });

            if (window.theme != "flat")
                url = url + "?theme=" + window.theme;
            $("#samplefile").attr('src', url);
            $("#samplefile")[0].contentWindow.focus();
			$("#newsamplewindow").attr('href',currentSamplepage);

            var curr;
            if (curr = ($("#samplesDiv").children("#" + ctrlname).find("div[querystring=" + samplename + "]"))) {
                    $("#samplesDiv").children("#" + ctrlname).find("div[querystring=" + samplename + "]").children('span.anchor').addClass("itemselected");
                    $("#samplesDiv").children("#" + ctrlname).find("div[querystring=" + samplename + "]").addClass("highlighttextbg");					               
					$("#samplesDiv").children("#" + ctrlname).find("div[querystring=" + samplename + "]").addClass("selecteddashboard");
            }
            var currentname = ctrlname;
            var currentfile = samplename;
            var currFile = $('.samples .anchorclass .itemselected').parent('.firstlevelload').parent('.anchorclass');
            var currFileParent = $(currFile).parents('div');
            var subFile = $('.samples .anchorclass .itemselected').parents('.secondlevelload');
            var subFileParent = $('.samples .anchorclass .itemselected').parents('.secondlevelload').parents('.anchorclass');
            $('span.prev').bind('click', function (evt, args) {
                var index=$("#samplesDiv .SB-hashcollection").index($("#samplesDiv .highlighttextbg").parent());
				if(index>0)
			    {
				$('#samplefile').css('visibility', 'hidden');
				$('#sourceTab').css('visibility', 'hidden');
				  var hashBang =$($("#samplesDiv .SB-hashcollection")[index-1]).attr("hashbang");				  
					queryChange(hashBang);
             	}
            });

            $('span.next').bind('click', function (evt, args) {
                var index=$("#samplesDiv .SB-hashcollection").index($("#samplesDiv .highlighttextbg").parent());
				if(index<$("#samplesDiv .SB-hashcollection").length-1)
			    {
				 $('#samplefile').css('visibility', 'hidden');
				 $('#sourceTab').css('visibility', 'hidden');
				  var hashBang = $($("#samplesDiv .SB-hashcollection")[index+1]).attr("hashbang")				  
					queryChange(hashBang);
             	}
            });
			if ($(".highlighttextbg.selecteddashboard").length == 1 && $(".highlighttextbg.selecteddashboard")[0].offsetTop>=0) {
				var scrollercontrol = $("#scrollcontainer").ejScroller("instance");
				scrollercontrol.model.scrollTop = $(".highlighttextbg.selecteddashboard")[0].offsetTop ;
				scrollercontrol.refresh();
            }
        };


        self.loadSBMainPage = function (divid) {
            $(".samplesection").hide();
            if (divid != null) {
                $("#" + divid).css("visibility", "hidden");
                $("#" + divid + "_back").css("display", "none");
            }
			//code for removing the firstlevelback and secondlevelback header. 
            $("#sbdashboard").show();
            if ($("#dashboardheader .firstlevelback"))
                $("#dashboardheader .firstlevelback").remove();

            if ($("#dashboardheader .current_control"))
                $("#dashboardheader .current_control").remove();
            self.loadSBPage(divid);
        };
        self.loadSBPage = function (divid) {
            $("#accordion2").prev().css("display", "block");
            $("#accordion2>a>.dashboardhover").removeClass("dashboardhover");
            $(".sourcecodetab").hide();
            if (divid != null)
                $("#" + divid).hide();
            $("#accordion2").show();
            $("#samplesDiv").css("left", "250px");
            $("#accordion2").animate({ left: 0 }, 200, function () {
                self.setVisibility("cols-iframe", "productpage");
            });
            $('html, body').animate({
                scrollTop: 0
            }, 0);
        };
        var count = 0;
        self.loadSourceCodeTab = function (url) {
            window.htmlEditor = [];                              
            $.ajax({
                url: url,
                dataType: "html",
                success: function (data) {
                    $("#sourceTab").html('');
                    var ulTag = ej.buildTag('ul');
                    var liTag = ej.buildTag('li');
                    var aTag = ej.buildTag('a').attr({ "href": "#htmlpage" }).text(window.sample.name);
					 
                    liTag.append(aTag);
                    ulTag.append(liTag);
                    var divTag = ej.buildTag("div#htmlpage");
                    $("#sourceTab").append(ulTag).append(divTag);
                    var content = data;
                    if (count > 0) {
                        var target = $('#sourceTab').data("ejTab");
                        target.destroy();					
                    }
                    count++;
                    $(".sourcecodetab").show();

                    $("#sourceTab").ejTab({ cssClass: "metroblue",enableTabScroll:false }).show();
                    window.htmlEditor.push(CodeMirror.fromTextArea($("#htmlpage").val(content)[0], {
                        lineNumbers: false,
                        mode: "text/html"
                    }));
                    $("#htmlpage").next($(".CodeMirror")).appendTo("#htmlpage");
                    if (window.themevarient.indexOf("dark") != -1)
                        replacebg(true);
                    $(".CodeMirror").each(function (i, obj) {
                        if (i > 0)
                            $(obj).remove();
                    });
                    $("#sourceTab .CodeMirror").find('textarea').attr('readonly', 'readonly');
                    $("<span>").attr("id", "copy-wrapper").appendTo($("#sourceTab .e-header"));
                    $("<button>").attr("id", "copyclipboard").attr('title', 'Copy To Clipboard').appendTo($("#sourceTab #copy-wrapper"));
                    
                    $("<span>").attr("id", "edit-wrapper").appendTo($("#sourceTab .e-header"));
                    $("<button>").attr("id", "EditWindow").attr('title', 'Edit in JS Playground').appendTo($("#sourceTab #edit-wrapper"));
                   
					$("<div>").insertAfter($("#sourceTab")).attr("id", "clipboard");
                    $("<textarea>").attr("style", "display:none").attr("id", "copytextarea").appendTo($("#clipboard"));
                    $("<span>").addClass("copycode copycodedown").text("COPY TO CLIPBOARD").appendTo("#htmlpage");
                    initiateCopyHandler();
                    if (window.sample.additionalTabs) {
                        setTimeout(function () { self.ensureAdditionalTab() }, 100);
                    }
                    $("#EditWindow").ejButton({
                        size: "small",
                        cssClass: "copyedit",
                        text: "Edit",
                        contentType: "textandimage",
                        prefixIcon: "e-icon newsrcwindow"
                    });
                    $("#copyclipboard").ejButton({
                        size: "small",
                        cssClass: "copyedit copycode",
                        text: "Copy",
                        contentType: "textandimage",
                        prefixIcon: "e-icon  copycodeicon"
                    });
                }
            });
        };
        self.ensureAdditionalTab = function () {           
            if (window.sample.additionalTabs.length > 0) {
                for (var i = 0; i < window.sample.additionalTabs.length; i++) {
                    $("#sourceTab").ejTab("addItem", "#" + window.sample.additionalTabs[i].displayName, window.sample.additionalTabs[i].displayName, 3);
                    var dataval=null, path = codeMirrorModes(window.sample.additionalTabs[i].filePath) == "text/x-csharp" ? "sourceCodehandler.ashx" : window.sample.additionalTabs[i].filePath;
                    if (path == "sourceCodehandler.ashx")
                        dataval = { 'url': window.sample.additionalTabs[i].filePath };
                    $.ajax({
                            url: path,
                            dataType: "html",
                            contentType: "application/json",
                            data: dataval,
                            success: function (data) {
                                var tabid, dataurl=$(this)[0].url, content = data;                                
                                dataurl = decodeURIComponent(dataurl).replace("sourceCodehandler.ashx?url=", "");
                                for (var i = 0; i < window.sample.additionalTabs.length; i++) {
                                    if (window.sample.additionalTabs[i].filePath == dataurl) {
                                        tabid = window.sample.additionalTabs[i].displayName;
                                        break;
                                    }
                                }                              
                                window.htmlEditor.push(CodeMirror.fromTextArea($("#" + tabid).val(content)[0], {
                                    lineNumbers: false,
                                    mode: codeMirrorModes(window.sample.additionalTabs[i].filePath)
                                }));
                                $("#" + tabid).parent().children(".CodeMirror").appendTo("#" + tabid);
                                $("<span>").addClass("copycode copycodedown").text("COPY TO CLIPBOARD").appendTo("#" + tabid);
                                $("#sourceTab .CodeMirror").find('textarea').attr('readonly', 'readonly');
                                initiateCopyHandler();
                            }                           
                        });
                    }
                }            
        };

        self.setVisibility = function (oldpage, newpage) {
            $("." + newpage).show();
            $("." + oldpage).hide();
        };
        this.getCssClass = function (item) {
            var value = Number(item.childcount);

            if (value >= 1) {
                return 'arrow';
            }
            return;
        };
        this.getCssVisibility = function (item) {
            var value = Number(item.id);

            if (value != 1) {
                return 'hideParent';
            }
            return 'dashboard';
        };
        self.removeSelectedItemcss = function (ctrlname, controlid) {
            var obj = $(".itemselected");
            obj.each(function () {
                $(obj).removeClass('itemselected');
                $(obj).parent().removeClass('highlighttextbg');
            });
			$(".selecteddashboard").removeClass("selecteddashboard");
        };
    }
		var Mainlist=[];
    
	$(GroupingList).each(function () {
	    Mainlist[this.toString()]=[];
	});

    var samplesdetails = SamplesList;
    $(samplesdetails).each(function (index1, sampleslist) {
        if (sampleslist) {
            var smpls = {}, secsamples = [];
            smpls["id"] = sampleslist.id;
            smpls["name"] = sampleslist.name;
            smpls["type"] = sampleslist.type;
            smpls["url"] = SamplesList[index1]["url"] = sampleslist.querystring.split(" ").join("");
			smpls["publish"] = sampleslist.publish;
            $(sampleslist.samples).each(function (ind, subsampleslist) {
                if (subsampleslist) {
                    var subsmpls = {};
                    subsmpls["id"] = subsampleslist.id;
                    subsmpls["name"] = subsampleslist.name;
                    subsmpls["querystring"] = subsampleslist.querystring;
                    subsmpls["childcount"] = subsampleslist.childcount;
                    subsmpls["type"] = subsampleslist.type;
					if( subsampleslist.publish)
                    subsmpls["publish"] = subsampleslist.publish;
					else
                    subsmpls["publish"] =smpls["publish"];
                    subsmpls["url"] = SamplesList[index1].samples[ind]["url"] = subsampleslist.name.split(" ").join("");

                    if (subsampleslist.childcount == 1)
                        subsmpls["arrowclass"] = "arrow";
                    else
                        subsmpls["arrowclass"] = "";

                    $(subsampleslist.samples).each(function (j, thirdlist) {
                        if (thirdlist)
                            SamplesList[index1].samples[ind].samples[j]["url"] = thirdlist.name.split(" ").join("");
                    });
                    subsmpls["samples"] = subsampleslist.samples;
                    if(subsmpls["publish"] != 'online')
                        secsamples.push(subsmpls);
                }
            });
            smpls["samples"] = secsamples;
			var temp=this;
			$(GroupingList).each(function () {
			if(temp["Group"]==this.toString())
			{
				Mainlist[this.toString()].push(smpls);
				return false;
            }});
        }
    });
    window.jsonline = ($.trim(window.location.host.toString()) == "js.syncfusion.com");
	$("#accordion2").html($("#accordionGroupTmpl").render(GroupingList));
	$(GroupingList).each(function () {
	  var content=$("#accordionTmpl").render(Mainlist[this], { online: window.jsonline });
	  if($.trim(content) !="")
	  {
	   $(".SB-group."+this.toString().replace(/ /g, "")).html(content);
		$(Mainlist[this.toString()]).each(function () {
	     firstlevelsamples.push(this);
		 });
	  }
	  else
		$(".SB-group."+this.toString().replace(/ /g, "")).hide().prev().hide();
	});
    $("#samplesDiv").html($("#accordionTmplchild").render(firstlevelsamples, { online: window.jsonline }));
    $("#scrollcontainer").ejScroller({buttonSize:0,scrollerSize:9});
	$("#scrollcontainer .SB-groupIt").click(function()
	{
	if($(this).hasClass("downArrow"))
	{
	$(this).next().hide(300, function(){ refreshScroller()});
	$(this).removeClass("downArrow");
	$(this).addClass("rightArrow");
	}
	else
	{
	$(this).next().show(300,function(){ refreshScroller()});
	$(this).removeClass("rightArrow");
	$(this).addClass("downArrow");	
	}	
	});
	RefreshPoductNav();
    refreshScroller();
	refreshContentWindow();
    function refreshScroller() {
		//scroller resize refresh
		$(".accordion-panel.cols-fixed-sidebar").attr("style","height:"+(($(window).height() - $(".sbheader").outerHeight()))+"px ;");
        var controlheight = $("#scrollcontainer").ejScroller("instance");
        var Minheight = ($(window).height()) - ($(".header").outerHeight() + $("#dashboardheader").outerHeight() + $(".accordion-panel .search").outerHeight());
        controlheight.model.height = Minheight;
        controlheight.refresh();
	    $("#scrollcontainer .e-vhandle").addClass("e-box");
    }
	$( "#auto" ).focusin(function(event) {
	setTimeout(function(){$('.content-container-fluid .row > .navigation').addClass('expandPanel');}, 500);
	
	});
	function refreshContentWindow(){
	//resizing for content fluid width 
$(".scrollit").attr("style","height:"+(($(window).height() - $(".sbheader").outerHeight()))+"px;");		
	}
    
    $('.accordion-panel').on('click', 'div.firstlevelback', function (evt, args) {
        editItem(evt.currentTarget.id, 'back');
    });
	function RefreshPoductNav()
	{
	$(".header").removeClass("Mobile").removeClass("Desktop");
	if($(window).width()>899)
		$(".header").addClass("Desktop");
	else
		$(".header").addClass("Mobile");
	}	
    $(".dashboard").mouseover(function () {
        if (!$(".vHandle").is(":visible")) {
            if (window.themevarient.indexOf("dark") != -1 && !$(this).hasClass("dark-highlighttextbg"))
                $(this).addClass("dark-dashboardhover");
            else
                $(this).addClass("dashboardhover");
        }
    });
    $(".dashboard").click(function () {
        $(this).find(".anchor").addClass("itemselected");
        $(".dark-dashboard").hasClass("dark-highlighttextbg");
        $(".dark-dashboard").removeClass("dark-highlighttextbg");
        $(this).find(".itemselected").parent().addClass("highlighttextbg");

    });
    $(".dashboard").mouseout(function () {
        if ($(this).hasClass("dashboardhover"))
            $(this).removeClass("dashboardhover");
        else if ($(this).hasClass("dark-dashboardhover"))
            $(this).removeClass("dark-dashboardhover");
    });
    var collection = SamplesList;
    var subdata = [], i, j, k;
    for (i = 0; i < collection.length; i++) {
        if (!collection[i]) continue;
        if ((collection[i].publish == "online" && window.jsonline) || collection[i].publish != "online") {
            for (j = 0; j < collection[i].samples.length; j++) {
                if (!collection[i].samples[j]) continue;
                var properties = {}, len;
                var controlName = collection[i].id;
                if ((collection[i].samples[j].publish == "online" && window.jsonline) || collection[i].samples[j].publish != "online") {
                	if(!collection[i].samples[j].samples)
					{
                    properties["id"] = controlName + "/" + collection[i].samples[j].url;
						properties["control"]=collection[i].name;
						properties["text"] = collection[i].samples[j].name;				
						properties["data"]=collection[i].name+" "+collection[i].samples[j].name;
						subdata.push(properties);
                }
                }
                if (collection[i].samples[j].childcount != "0") {
                    if (/msie 8.0/.test(navigator.userAgent.toLowerCase()))
                        len = collection[i].samples[j].samples.length - 1;
                    else
                        len = collection[i].samples[j].samples.length;
                    if (collection[i].samples[j].name == "Selection")
                        var s = true;
                    if ((collection[i].samples[j].publish == "online" && window.jsonline) || collection[i].samples[j].publish != "online") {
                        for (k = 0; k < len; k++) {
                            if (!collection[i].samples[j].samples[k]) continue;
                            var subprops = {};
                            var subcontrolName = collection[i].samples[j].url;
                            if ((collection[i].samples[j].samples[k].publish == "online" && window.jsonline) || collection[i].samples[j].samples[k].publish != "online") {
                                subprops["id"] = controlName + "/" + subcontrolName + "/" + collection[i].samples[j].samples[k].url;
								subprops["control"]=collection[i].name;
                                subprops["text"] = collection[i].samples[j].name+"/" +collection[i].samples[j].samples[k].name;
								subprops["data"]=collection[i].name+" "+collection[i].samples[j].name+"/" +collection[i].samples[j].samples[k].name;
                                subdata.push(subprops);
                            }
                        }
                    }
                }
            }
        }
    }
    $('#auto').ejAutocomplete({
        watermarkText: "Search here",
        showPopupButton: false,
        filterType: "Contains",
        dataSource: subdata,
        fields: { key: "id", text: "data" },
        width: "210px",
		popupHeight:"180px",
		template: '<div class="control_name ">${control}</div> <div class="control_samplename">${text}</div>',
        select: "onSelectSearchItem"
    });
	var autocompletScroller= $("#auto").data("ejAutocomplete").scrollerObj;
	autocompletScroller.model.buttonSize=0;
	autocompletScroller.model.scrollerSize=8;
    $('.navigation').bind('click', function () {
        var move, proxy = this;
        if ($(this).hasClass("expandPanel")) {
            $('.navigation').removeClass("expandPanel").addClass("collapsePanel"), move = -$('.accordion-panel').outerWidth();
            $('.control-panel.cols-content-fluid').addClass('center-flow');
            $('content-container-fluid > row > .navigation').addClass("expandPanel");
        }
        else {
            $(proxy).removeClass("expandPanel");
            $('.accordion-panel').removeClass('accordionHide').addClass("expandPanel");
            $('.control-panel.cols-content-fluid').removeClass('accordionHide').removeClass('center-flow');
            $('.accordion-panel > .navigation').addClass("expandPanel");
            $('.navigation').removeClass("collapsePanel"), move = 0;
            if (parseInt($('.accordion-panel').css('left')) >= 0) {
                $('.accordion-panel').css('left', '-' + $('.accordion-panel').outerWidth() + 'px');
            }
            $('.accordion-panel .navigation').addClass("expandPanel");
            refreshScroller();
        }
        $('.accordion-panel').animate({
            "left": move + "px"
        }, 500, function () {
            if ($('.navigation').hasClass("collapsePanel")) {
                $('.accordion-panel').addClass('accordionHide');
                $('.navigation').show();

            }
            if ($(proxy).hasClass("expandPanel")) {
                $('.accordion-panel').addClass("expandPanel");
            }
        });
    });
    $(window).bind("resize", function () {
        var viewportWidth = $(window).width();
        if (viewportWidth < 981) {
            $('.content-container-fluid .row > .navigation').addClass('collapsePanel');
            $('.accordion-panel').removeClass("expandPanel");
        }
		refreshScroller();
		refreshContentWindow();
		RefreshPoductNav();
    });
    if (Path.match(window.location.hash)) {
        $("#sbtooltipbox").ejDialog("close");
        isloadLeft = true;
        // $(".cols-iframe").show();
        showTooltipbox();
    }
    //var heightval = (window.innerHeight || $(window).height()) - ($(".header").outerHeight() + 5 + $(".search").outerHeight());
    //if(heightval<minScrollerHeight)
    //    heightval = minScrollerHeight;
    //else
    //    heightval = heightval - $("#footer").outerHeight();
    //var scroller = $("#scrollcontainer").width(253).data("ejScroller");
    //scroller.setModel({ height: heightval, width: 0, cssClass: "metroblue" });
    //scroller.refresh();

    $(document).click(function (evt) {
        if ($("#sbtooltipbox").ejDialog("isOpened"))
            $("#sbtooltipbox").ejDialog("close");

        if ($(evt.target).parents("#themeDialog_wrapper").length <= 0 && evt.target.id != "themebutton"&& !$("#themeDialog").hasClass("Opened")) {            
                $("#themeDialog").ejDialog("close");
        }
		$("#themeDialog").removeClass("Opened");
		if($(window).width()<900&& $("#Res-prodnav").hasClass("selectIt"))
 {
$(".product-naviation").removeClass("hideIt");
$("#Res-prodnav").removeClass("selectIt");
$(".product-naviation").attr("style","margin-left:"+($(window).width()-124)+"px;");
 }
 else
$(".product-naviation").addClass("hideIt"); 
    });
    $(".editcode").click(function () {
        $("#sbeditcodedialog").ejDialog(
                {
                    enableModal: true,
                    showOnInit: false,
                    allowDraggable: false,
                    width: "98%",
                    height: "95%",
                    cssClass: "metroblue",
                    enableResize: false,
                    content: "iframe",
                    contentUrl: "editcode.html?" + editcontrolpath,
                    title: "LIVE EDIT",
                    close: "onClose"
                });
        $("#sbeditcodedialog").show();
        $("#sbeditcodedialog").ejDialog("open");
        $('html, body').animate({
            scrollTop: 0
        }, 0);
        $("#sbeditcodedialog iframe").bind("load", function () {
            $('.liveeditctrls').insertAfter($("#sbeditcodedialog_wrapper .e-dialog-title")).addClass("showliveeditctrls");
            $("#sbeditcodedialog_wrapper .liveeditctrls #cssarea").ejCheckBox({ cssClass: "metroblue", "change": "oncssareaShowHide" });
            $("#sbeditcodedialog .e-iframe").contents().find("#apply").insertAfter($('.liveeditctrls'));
        });
    });
    $(".circlebaseouter").mouseover(function (evt) {
        if ($(".circlebaseouter").parent().hasClass("e-disable")) return false;
        $(".hoverselcolor").removeClass("hoverselcolor");
        $(this).addClass("hoverselcolor");
    });
    $(".circlebaseouter").mouseout(function (evt) {
        if ($(".circlebaseouter").parent().hasClass("e-disable")) return false;
        $(".hoverselcolor").removeClass("hoverselcolor");
    });
    $(".circlebaseouter .azure,.circlebaseouter .lime,.circlebaseouter .saffron").click(function (evt) {
        if ($(".circlebaseouter").parent().hasClass("e-disable")) return false;
        $(".colorsel").removeClass("colorsel");
        $(this).parent().addClass("colorsel");
        var selcolor = $(this).parent().attr("id");
        window.themecolor = selcolor.replace("theme", "");
        updateTheme();
    });
    //var mouseHover = function () {
    //    $("#scrollcontainer").find(".vScroll").show().addClass("scrollhandlehover");
    //    $("#scrollcontainer").find(".vScroll").prev().addClass("scrollercontainer-content");
    //};

    //var mouseOut = function () {
    //    $("#scrollcontainer").find(".vScroll").hide().removeClass("scrollhandlehover");
    //    $("#scrollcontainer").find(".vScroll").prev().removeClass("scrollercontainer-content");
    //    $("#scrollcontainer").find(".content").addClass("scrollercontainer-content");
    //};

    //$("#scrollcontainer").bind("mouseover", mouseHover);
    //$("#scrollcontainer").bind("mouseout", mouseOut);
    //$("#scrollcontainer").on("mousedown", ".vHandle", function () {
    //    $("#scrollcontainer").unbind("mouseout", mouseOut);

    //    $(document).one("mouseup", function () {
    //        $("#scrollcontainer").bind("mouseout", mouseOut);
    //        $("#scrollcontainer").find(".vScroll").hide();
    //    });
    //});
    Path.listen();

    var QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    }();
	ej.support.stableSort = false; 
});
function oncssareaShowHide(args) {
    if (args.isChecked) {
        if ($($("#ejcssarea .e-innerspan")[1]).hasClass("e-chk-inactive"))
            $($("#ejcssarea .e-innerspan")[1]).addClass("e-chk-active")

        $($("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-pane")[1]).show();
        $("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-bar").show();
        var cssheight = $($("#sbeditcodedialog .e-iframe").contents().find("#spliter1 .v-pane")[0]).css("height");
        $($("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-pane")[0]).css("height", cssheight);
    }
    else {
        $($("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-pane")[1]).hide();
        $("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-bar").hide();
        cssheight = $($("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-pane")[0]).css("height");
        $($("#sbeditcodedialog .e-iframe").contents().find("#spliter2 .v-pane")[0]).css("height", "100%");
    }
}
function refreshIFrameTheme() {

    if (currentSamplepage != undefined && !$("#sbdashboard").is(":visible"))
        self.loadSourceCodeTab(currentSamplepage);
    setTimeout(function () {
        if ($(".control-panel").data("ejWaitingPopup"))
            $(".control-panel").ejWaitingPopup("hide");
        autoResize("samplefile");
        $("body").attr('class') == 'fixedlayout' ? $("body").removeAttr('class') : $('body').removeClass('fixedlayout');
    }, 600);
    $('#samplefile').css('visibility', 'visible');
	$('#sourceTab').css('visibility', 'visible');
	$('.control-panel.scrollit').scrollTop(0);
}
function onClose(args) {

}
function updateHeight() {
    $(".cols-iframe").show();
    $("#footer").show();
}


function preparetheme() {
    var themename = "";
    if (window.location.hash.indexOf('dark') != -1 && window.themevarient != 'light')
        window.themevarient = "dark";
    if (window.location.hash.indexOf('gradient') != -1 && window.themestyle != 'flat')
        window.themestyle = "gradient";
    if (window.themevarient == "dark") {
        if (window.themestyle == "gradient")
            themename = window.themestyle + window.themecolor + window.themevarient;
        else
            themename = (window.themecolor != "") ? window.themecolor + window.themevarient : window.themestyle + window.themevarient;

    }
    else {
        if (window.themestyle == "gradient")
            themename = window.themestyle + window.themecolor;
        else
            themename = (window.themecolor != "") ? window.themecolor : window.themestyle;
    }
    if (window.theme.indexOf("bootstrap") != -1) {
        themename = window.theme;
        window.themestyle = "flat";
        window.themevarient = "light";
    }
    window.theme = themename;
}

function updateTheme(selcolor) {
    preparetheme();
    replacebg(window.themevarient == "dark");
    replaceTheme();
}
var themes = {
    "flat": "themes/default-theme/ej.widgets.all.min.css",
    "flatdark": "themes/flat-azure-dark/ej.widgets.all.min.css",
    "azure": "themes/default-theme/ej.widgets.all.min.css",
    "azuredark": "themes/flat-azure-dark/ej.widgets.all.min.css",
    "lime": "themes/flat-lime/ej.widgets.all.min.css",
    "limedark": "themes/flat-lime-dark/ej.widgets.all.min.css",
    "saffron": "themes/flat-saffron/ej.widgets.all.min.css",
    "saffrondark": "themes/flat-saffron-dark/ej.widgets.all.min.css",
    "gradient": "themes/gradient-azure/ej.widgets.all.min.css",
    "gradientdark": "themes/gradient-azure-dark/ej.widgets.all.min.css",
    "gradientazure": "themes/gradient-azure/ej.widgets.all.min.css",
    "gradientazuredark": "themes/gradient-azure-dark/ej.widgets.all.min.css",
    "gradientlime": "themes/gradient-lime/ej.widgets.all.min.css",
    "gradientlimedark": "themes/gradient-lime-dark/ej.widgets.all.min.css",
    "gradientsaffron": "themes/gradient-saffron/ej.widgets.all.min.css",
    "gradientsaffrondark": "themes/gradient-saffron-dark/ej.widgets.all.min.css",
    "bootstrap": "themes/bootstrap-theme/ej.widgets.all.min.css"
};
function updateLinkTag() {
    var links = $(document.head || document.getElementsByTagName('head')[0]).find("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.indexOf("ej.widgets.all.min.css") != -1)
            links[i].href = themes[theme];
    }
}
function replaceTheme() {
    if ((window.theme.indexOf("lime") != -1) || (window.location.hash.indexOf('lime') != -1 && window.themecolor != 'azure' && window.themecolor != "saffron"))
        window.themecolor = 'lime';
    else if ((window.theme.indexOf('saffron') != -1) || (window.location.hash.indexOf('saffron') != -1 && window.themecolor != 'azure' && window.themecolor != 'lime'))
        window.themecolor = 'saffron';
    else
        window.themecolor = "azure";
    var selcolor = (window.themecolor == "") ? "azure" : window.themecolor;
    $("#themebutton").ejButton('option', 'prefixIcon', 'e-icons ' + selcolor);
    $("#themebutton .e-uiLight").addClass(selcolor);
    $(".htmljssamplebrowser").attr("class", "htmljssamplebrowser " + selcolor);
    
    updateLinkTag();
    if (window.currentSamplepage) {
        var querystring = "";
        if (window.theme != "flat") {
            querystring = "?theme=" + window.theme;
        }
        $("#samplefile").attr('src', currentSamplepage + querystring);
		$("#newsamplewindow").attr('href',currentSamplepage);
    }
    if (window.location.hash === "")
        window.location.hash = "#!/" + window.theme;
    window.location.hash = window.location.hash.replace(/(#!\/[^\/]+)/, "!/" + window.theme);
}
function replacebg(enable) {
    if (enable)
        $("body").addClass("darktheme");
    else
        $("body").removeClass("darktheme");
}
function onSelectSearchItem(args) {
    var samples = (args.key).split("/");
    var url = "#!/" + window.theme + "/" + args.key;
    $(".samples").hide();
    self.loadLeftTab(samples[0], samples[1]);
    window.location.hash = url;
}
function themebtnClick(args) {
    showThemeDialog();
}
function showTooltipbox() {
    var $btnelement = $("#themebutton");
    var pos = $btnelement.offset();
    var left = $("#sbtooltipbox_wrapper").width() + pos.left;
    if (left > $(".samplecontainerparent").width())
        left = (pos.left + ($btnelement.width() / 2)) - $("#sbtooltipbox_wrapper").width();
    else
        left = pos.left;
    $("#sbtooltipbox").ejDialog("option", "position", { X: left + 10, Y: $(".header").height() + 7 });
    $("#sbtooltipbox").ejDialog("open");
}
function showThemeDialog() {
    var $btnelement = $("#themebutton");
    var pos = $btnelement.offset();
    var left = $("#themeDialog_wrapper").width() + pos.left;
    if (left > $(".samplecontainerparent").width())
        left = (pos.left + $btnelement.width()) - $("#themeDialog_wrapper").width();
    else
        left = pos.left;
    $("#themeDialog").ejDialog("option", "position", { X: left, Y: $(".header").height() + 7 });
    if ($("#themeDialog").ejDialog("isOpened") != true)
	 $("#themeDialog").addClass("Opened").ejDialog("open");
    else
	  $("#themeDialog").removeClass("Opened").ejDialog("close");
    //$(".metroclstxt").appendTo($("#ejmetrotext"));
    //$(".graclstxt").appendTo($("#ejgradienttext"));
    //$(".liteclstxt").appendTo($("#ejlighttext"));
    //$(".darkclstxt").appendTo($("#ejdarktext"));
}
function themeonchange(args) {
if ($("." + args.model.name).hasClass("e-disable")) return false;
    switch (args.model.name) {
        case "themestyle":
            window.themestyle = args.model.value;
            break;
        case "themevarient":
            window.themevarient = args.model.value;
            break;
    }
    updateTheme();
    radioButtonSelect();
}
function bootstraponselect(args) {
    if (args.isChecked) {
        enableBootstrap(true);
        window.theme = "bootstrap";
        window.themecolor = "azure";
        updateTheme(window.theme);
    }
    else {
        enableBootstrap(false);
        window.theme = "azure";       
        window.themecolor = "azure";
        updateTheme(window.theme);
        themeButtonSelect();
    }
}
function enableBootstrap(enable) {
    if (enable) {
        $(".themecolors").addClass("e-disable");
        $(".themevarient").addClass("e-disable");
        $(".themestyle").addClass("e-disable");
    }
    else {
        $(".themecolors").removeClass("e-disable");
        $(".themevarient").removeClass("e-disable");
        $(".themestyle").removeClass("e-disable");
    }
    $("#lighttext").ejRadioButton("option", "enabled", !enable);
    $("#darktext").ejRadioButton("option", "enabled", !enable);
    $("#metrotext").ejRadioButton("option", "enabled", !enable);
    $("#gradienttext").ejRadioButton("option", "enabled", !enable);


}
function radioButtonSelect() {
    $('#ejmetrotext,#ejgradienttext,#ejlighttext,#ejdarktext').children('span').children('span').removeClass('e-rad-active');
    if (window.location.hash.indexOf("gradient") != -1) {
        $('#ejgradienttext').children('span').children('span').addClass('e-rad-active');
        window.themestyle = 'gradient';
    }
    else if (window.location.hash.indexOf("dark") != 1 && window.location.hash.indexOf("light") != 1) {
        $('#ejmetrotext').children('span').children('span').addClass('e-rad-active');
        window.themestyle = 'flat';
    }
    if (window.location.hash.indexOf("dark") != -1) {
        $('#ejdarktext').children('span').children('span').addClass('e-rad-active');
        window.themevarient = 'dark';
    }
    else if (window.location.hash.indexOf("gradient") != 1 && window.location.hash.indexOf("flat") != 1) {
        $('#ejlighttext').children('span').children('span').addClass('e-rad-active');
        window.themevarient = 'light';
    }
    if ((window.location.hash.indexOf("bootstrap") != -1)) {
        $("#bootstrapcheck").ejCheckBox("option", "checked", true);
        enableBootstrap(true);
    }

}
function themeButtonSelect() {
    $('#themesaffron,#themeazure,#themelime').removeClass('colorsel');
    if ((window.theme.indexOf("lime") != -1) || (window.location.hash.indexOf('lime') != -1)) {
        $('#themelime').addClass('colorsel');
        window.themecolor = 'lime';
    }
    else if ((window.theme.indexOf("saffron") != -1) || (window.location.hash.indexOf('saffron') != -1)) {
        $('#themesaffron').addClass('colorsel');
        window.themecolor = 'saffron';
    }
    else {
        $('#themeazure').addClass('colorsel');
        window.themecolor = 'azure';
    }
    radioButtonSelect();
    theme = (themestyle == "flat" ? "" : themestyle) + themecolor + (themevarient == "light" ? "" : themevarient);
    updateLinkTag();
}
function queryChange(hashBang) {
    if (hashBang != null)
        window.location.hash = hashBang.replace("flat", window.theme);
}
function adjustpopupposition(args) {
    var offset = $("#selectControls_dropdown").offset();
    var height = $("#selectControls_wrapper").height();
    $("#selectControls_popup").css("top", (offset.top + height + 14) + "px");
    var left = $("#selectControls_popup").width() + offset.left;
    if (left > $(".content-container-fluid").width())
        left = (offset.left + $("#selectControls_dropdown").width()) - $("#selectControls_popup").width() - 12;
    $("#selectControls_popup").css("left", left + "px");
}
function viewdemo(product) {
    product = product.toLowerCase();
    if (window.jsonline) { if (product == "desktop") return; else window.location.href = "http://js.syncfusion.com/demos/mobile/"; }
    else
    {
        if (location.protocol == "file:" || location.toString().indexOf("sfjavascriptsamplebrowser") != -1) {
            if (product == "desktop") return; else window.location.href = window.mobileJsUrl;
        }
        else {
            var text = 'StartDevServer.ashx', prot = window.location.protocol, hostname = window.location.host;
            if (product == "desktop") return; else product = "mobile";
            $.ajax({
                url: prot + "//" + hostname + "/" + text + "?product=" + product,
                success: function (data) {
                    window.location = data;
                }
            });
        }
    }
}
function autoResize(id) {
var newheight; 
 if($("#"+id+":visible"))
     newheight = $(document.getElementById(id).contentWindow.document.body).height();	
$("#"+id).height(newheight+30);
}

function initiateCopyHandler() {
    try {
        var client = new ZeroClipboard($('.copycode'));

        client.on('ready', function (event) {
            client.on('copy', function (event) {
                event.clipboardData.setData('text/plain', copycontent());
            });
        });

        client.on('error', function (event) {
            console.log('ZeroClipboard error of type "' + event.name + '": ' + event.message);
            ZeroClipboard.destroy();
        });

        function copycontent(e) {
            if ($("#copytextarea").val() == "" || $("#copytextarea").val() == null) {
                $("#copytextarea").val("");
                $("#sourceTab >div:visible").each(function () { $("#copytextarea").val($("#copytextarea").val() + $(this).text().replace("COPY TO CLIPBOARD", "")); });
            }
            return $("#copytextarea").val();
        }

    }
    catch (e) { }
}

function codeMirrorModes(url) {
    var extn = url.substr(url.lastIndexOf(".") + 1, url.length).toLowerCase();
    switch (extn) {
        case "html":
        case "xml": return "text/html"; break;        
        case "css":     
        case "less": return "text/css"; break;
        case "js":
        case "ts": return "javascript"; break;
        case "ashx": 
        case "cs": return "text/x-csharp"; break;           
        default: return "text/html";

    }
}

