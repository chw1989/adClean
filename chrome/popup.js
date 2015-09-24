
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendRequest(tab.id, { action: "startClean" },function (response) {
        	var allDelDiv=response.delDiv;
        	// alert(allDelDiv.length);
        	for(var i=0;i<allDelDiv.length;i++)
        	{
            	var p=document.createElement("p");
            	p.innerHTML=allDelDiv[i].toLowerCase();
            	document.body.appendChild(p);
            }
            var p=document.createElement("p");
            p.innerHTML="共清除"+allDelDiv.length+"个广告信息    By：老晁";
            document.body.appendChild(p);
        });
    });