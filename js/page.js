mui.init({
	beforeback:function(){
		let indexPage =plus.webview.getWebviewById("./index.html");
		mui.fire(indexPage,'SendBtn',"");
		return true;
	},
	subpages:[{
		url:"./page01.html",
		id:"./page01.html",
		styles:{
			top:"0px",
			bottom:"45px"
		}
	}]
});
let subpages = ['./page01.html','./page02.html'];
let subpage_style = {
	top:"0px",
	bottom:"45px",
	scrollIndicator: "none" ,// 当你的界面的内容足够多的时候，会出现滚动条，这个是隐藏滚动条
};
let activeTab = subpages[0];
let currentWebview;
mui.plusReady(function(){
	currentWebview = plus.webview.currentWebview();
	var secondWenview = plus.webview.getSecondWebview();
	currentWebview.append(secondWenview);
	plus.storage.setItem("prePage",activeTab);
});
mui('#footer').on('tap','a',function(e){
	let tab =this.getAttribute('name');
	
	if(tab != "./page03.html"){
		if(tab == activeTab){
			return;
		}
		let targetWebview = plus.webview.getWebviewById(tab);
		if(!targetWebview){
			targetWebview = plus.webview.create(tab, tab, subpage_style);
			currentWebview.append(targetWebview);
		}
		targetWebview.show('fade-in', 300);
		plus.webview.hide(activeTab);
	}else{
		console.log("发布"+tab);
		mui.openWindow({
			url: "./page03.html",
			id: "./page03.html",
			show: {aniShow: 'pop-in'},
			extras: {},
			waiting: {autoShow: true},
			createNew: true
		});
	}
	activeTab = tab;
	plus.storage.setItem("prePage",activeTab);
});
//监听发布按钮返回来的事件
window.addEventListener('SendBtn', function(event) { 
	console.log("事件返回"+activeTab);
});

