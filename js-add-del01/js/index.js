



function Tabs( tbs, nn ) {

	this.n = nn,
	
	this.id = 0, 
	this.name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
	this.sex = ['男', '女'], 
	this.tel = ['18190595210', '18011223853', '13550526750'],

	this.oBox = document.getElementById( 'box' ),
	this.oBtnCon = document.getElementById( 'btnContent' ),
	this.oAdd = document.getElementById( 'add' ),
	this.oDel = document.getElementById( 'del' ),
	this.oAllDel = document.getElementById( 'allDel' ),
	this.oTable = document.querySelector( tbs ),
	this.oTbody = document.getElementsByTagName( 'tbody' )[0],

	this.tdArr = [],
	this.txtArr = [],

	this.ti = new Date,
	this.tis = new Date,

	this.init() 
}

Tabs.prototype = {
	init: function() {
		this.rndName()
		this.rndSex()
		this.rndTel()
		this.bindEvent()
	},

	rndName: function() {
		this.named = parseInt( Math.random()*this.name.length )
		this.nowName = this.name[this.named]
	},

	rndSex: function() {
		this.sexed = parseInt( Math.random()*this.sex.length )
		this.nowSex = this.sex[this.sexed] 
	},

	rndTel: function() {
		this.teled = parseInt( Math.random()*this.tel.length )
		this.nowTel = this.tel[this.teled] 
	},

	bindEvent: function() {
		this.oAdd.onclick = ()=>{ this.addBtn() }
		this.oDel.onclick = ()=>{ this.delBtn() }
		this.oAllDel.onclick = ()=>{ this.allDelBtn() }
		this.prom = ()=>{ this.promd() }
	},

	addBtn() {
		this.id++ 
		num = '00'+this.id
		this.rndName(), this.rndSex(), this.rndTel()
		this.txtArr = [this.id, num, this.nowName, this.nowSex, this.nowTel]
		
		let tr = document.createElement( 'tr' )
		for (var j = 0; j < this.n; j++) {
			let td = document.createElement( 'td' )
			td.innerText = this.txtArr[j]
			tr.appendChild( td )
		}
		this.oTbody.appendChild( tr )
	},
	
	delBtn() {
		if ( new Date - this.ti <= 700 ) return
		this.ti = new Date

		let tr = document.querySelectorAll( 'tr' )
		if ( tr.length <= 1 ) this.promd( '无数据可删' )
		else this.oTbody.removeChild( tr[tr.length-1] )
	},
	
	allDelBtn() {
		if ( new Date - this.tis <= 700 ) return
		this.tis = new Date

		let tr = document.querySelectorAll( 'tr' )
		if ( tr.length <= 1 ) this.promd( '数据跑完啦' )
		else {
			for (var i = tr.length-1; i >= 1; i--)
				this.oTbody.removeChild( tr[i] )			
		}
	},

	promd( str ) {
		let oProm = document.createElement( 'div' )
		oProm.innerText = str
		document.body.appendChild( oProm )
		setTimeout( ()=> document.body.removeChild( oProm ), 700 ) // .7s后关闭 提示框
	}

}
let tabs = new Tabs( '#table', 5 )