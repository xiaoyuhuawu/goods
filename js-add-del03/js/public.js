



function Tabs( tbs, nn ) {
	this.n = nn,
	
	this.id = 0, // id 初始编号
	this.count = 0, // 循环背景图

	this.oBox = document.getElementById( 'box' ),
	this.oForm = document.getElementById( 'forms' ),
	this.oSend = document.getElementById( 'sends' ),
	this.oBtnCon = document.getElementById( 'btnContent' ),
	this.oInp = document.getElementById( 'inp' ),
	this.oDel = document.getElementById( 'del' ),
	this.oAllDel = document.getElementById( 'allDel' ),
	this.oBgImg = document.getElementById( 'bgImg' ),
	this.oTable = document.querySelector( tbs ),
	this.aTbody = document.getElementsByTagName( 'tbody' )[0],

	this.oTxtName = document.getElementById( 'names' ),
	this.oTxtTel = document.getElementById( 'tel' ),

	this.txtArr = [],

	this.ti = new Date,

	this.init() 
}

Tabs.prototype = {
	init: function() {
		this.bindEvent() // 绑定事件
		this.onFocus() // 获取鼠标 焦点
		this.onBlur() // 失去鼠标 焦点
		this.addEle() // 封装 添加元素insertAfter
	},

	addEle: function() {
		this.insertAfter = ()=>{ this.insAfter() }
	},

	insAfter( newElement, targetElement ) {
		// 得到父节点
		let parent = targetElement.parentNode
		if ( parent.lastChild === targetElement ) {
			// 如果最后的节点是目标元素 则直接添加 因为默认是添加到最后
			parent.appendChild( newElement )
		} else {
			// 不是 则插入在目标元素的下一个兄弟节点前面 也就是目标元素后面
			parent.insertBefore( newElement, targetElement.nextSibling )	
		}
	},

	bindEvent: function() {
		this.oInp.onclick = ()=>{ this.disHideBtn() } // 显示/隐藏 输入表单
		this.oSend.onclick = ()=>{ this.addBtn() } // 添加 按钮

		this.oDel.onclick = ()=>{ this.delBtn() }
		this.oAllDel.onclick = ()=>{ this.allDelBtn() }
		this.oBgImg.onclick = ()=>{ this.changeImg() }

		this.prom_1 = ()=>{ this.promd_1() } // 删除 提示
		this.prom_2 = ()=>{ this.promd_2() } // 正则 提示 未写
	},

	disHideBtn() { 
		if ( this.oForm.style.display != "block" ) 
			this.oForm.style.display = "block"
		else 
			this.oForm.style.display = "none"
	},

	onFocus: function() {
		this.oTxtName.onfocus = ()=>{ this.getFocusCode( '输入大小写英文、汉字组合且不超过8位', true ) }
		this.oTxtTel.onfocus = ()=>{ this.getFocusCode( '请输入包含[0,9]之间的数值', false ) }
	},

	onBlur: function() {
		this.oTxtName.onblur = ()=>{ this.getBlurCode() }
		this.oTxtTel.onblur = ()=>{ this.getBlurCode() }
	},

	getFocusCode( str, numed ) {
		this.oDiv = document.createElement( 'div' ) 
		if ( numed ) {
			this.oDiv.innerText = str
			this.oDiv.classList.add( 'getFocus_1' ) // 添加 类名
		} else {
			this.oDiv.innerText = str
			this.oDiv.classList.add( 'getFocus_2' )
		}
		this.insAfter( this.oDiv, this.oForm )
	},

	getBlurCode() {
		this.oBox.removeChild( this.oDiv )
	},
	
	promd_2() {
		
	},

	addBtn() {
		this.id++ 
		num = '00'+this.id
		
		// 正则部分
		// [1,8]位字母和数字的混合组成的正则表达式
		// 以1为开头 第二位可为3,4,5,7,8,中的任意一位 最后以0-9的9个整数结尾
		// var reg = /^[\w]{1,8}$/,
		//	reg2 = /^[1]([3-9])[0-9]{9}$/

		var nowName = document.getElementById( 'names' ).value,
			nowSex = document.getElementsByName( 'sex' ),
			nowTel = document.getElementById( 'tel' ).value
		
		// 单选按钮 获取值
		nowSex = nowSex[0].checked?nowSex[0].value:nowSex[1].value

		this.txtArr = [this.id, num, nowName, nowSex, nowTel]
		// 单击单选按钮时 生成一行
		let tr = document.createElement( 'tr' )
		// 生成 每行后面的那个 删除按钮
		this.btn = document.createElement( 'button' )
		for (var j = 0; j < this.n; j++) {
			let td = document.createElement( 'td' )
			td.innerText = this.txtArr[j]
			tr.appendChild( td )
		}
		
		this.btn.innerText = 'Delete'
		// 设置 动态 ID
		let activeId = 'delRow'+num
		this.btn.setAttribute( 'id', activeId )
		tr.appendChild( this.btn )
		this.aTbody.appendChild( tr )
		this.onlyDels = document.getElementById( activeId )

		// 每行后面的 删除按钮
		this.onlyDels.onclick = ()=>{ this.delRow( tr ) } 

		// 初始化 表单
		this.oForm.reset()
		this.disHideBtn()
	},
	 
	delRow( tr ) {
		this.aTbody.removeChild( tr )
	},

	delBtn() {
		if ( new Date - this.ti <= 700 ) return
		this.ti = new Date

		let tr = document.querySelectorAll( 'tr' )
		if ( tr.length <= 1 ) this.promd_1( '无数据可删' )
		else this.aTbody.removeChild( tr[tr.length-1] )
	},
	
	allDelBtn() {
		if ( new Date - this.ti <= 700 ) return
		this.ti = new Date

		let tr = document.querySelectorAll( 'tr' )
		if ( tr.length <= 1 ) this.promd_1( '数据跑完啦' )
		else {
			for (var i = tr.length-1; i >= 1; i--)
				this.aTbody.removeChild( tr[i] )			
		}
	},
	
	changeImg() {
		this.count = ( this.count > 3 )?0:this.count
		document.body.style.backgroundImage = `url(./img/bg/${this.count}.jpg)`
		document.body.style.backgroundSize = 'cover'
		this.count++
	},

	promd_1( str ) {
		let oProm = document.createElement( 'div' )
		oProm.innerText = str
		document.body.appendChild( oProm )
		setTimeout( ()=> document.body.removeChild( oProm ), 700 ) // .7s后关闭 提示框
	},

}
let tabs = new Tabs( '#table', 5 )