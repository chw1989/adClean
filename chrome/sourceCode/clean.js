var allDelDiv=new Array();
var debug=false;

function debugLog(logString)
{
	if(debug)
		console.log(logString);
}

function divPolicy()
{
    return /cproIframe|baidu|google|ad_left|ad_right|sinaad/i;
}

function insPolicy()
{
    return /sinaad|google|regGuideLayer/i;
}

function containsAd(element)
{
    if(element.id)
    {
        result=((element.id.search(insPolicy())!=-1) ||
                 (element.id.search(divPolicy())!=-1));
        return result;
    }
    else
    {
        result=((element.className.search(insPolicy())!=-1) ||
                 (element.className.search(divPolicy())!=-1));
        return result;
    }
}

function cleanDivAd(parent)
{
	debugLog("当前Iframe:"+parent.id);

	if((parent.nodeName).search(/iframe/i)!=-1 && parent.contentWindow!=null)
	 	parent=parent.contentWindow.document;

    var divAds = parent.getElementsByTagName("div");

    debugLog("  div的个数："+divAds.length);

    for(var i=0;i<divAds.length;i++)
    {
    	debugLog("    div："+divAds[i].id);
    	if(containsAd(divAds[i]))
    	{
    		debugLog("    delete:"+divAds[i].id);
    		allDelDiv.push("清除--"+( divAds[i].id ?  divAds[i].id : divAds[i].className));
    		divAds[i].parentNode.removeChild(divAds[i]);
    		i--;
        }
        
    }
}

function cleanInsAd(parent)
{
    var insAds = parent.getElementsByTagName("ins");

    debugLog("  ins的个数："+insAds.length);

    for(var i=0;i<insAds.length;i++)
    {
        debugLog("    ins："+insAds[i].className);
        if(containsAd(insAds[i]))
        {
            debugLog("    delete:"+insAds[i].className);
            allDelDiv.push("清除--"+insAds[i].className);
            insAds[i].parentNode.removeChild(insAds[i]);
            i--;
        }
        
    }
}

function cleanAds(parent)
{
    cleanDivAd(parent);
    cleanInsAd(parent);
}

function startClean()
{
    var allFrames=document.getElementsByTagName("iframe");

    for(var i=0;i<allFrames.length;i++)
    {
    	cleanAds(allFrames[i]);
    }

    cleanAds(document);
}

chrome.extension.onRequest.addListener(//监听扩展程序进程或内容脚本发送的请求
    function (request, sender, sendResponse) {
        if (request.action == "startClean") {
        	startClean();
        	sendResponse({ delDiv : allDelDiv });
        }
    }
); 