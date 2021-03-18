(this["webpackJsonpraspberrypi-dashboard"]=this["webpackJsonpraspberrypi-dashboard"]||[]).push([[0],{114:function(e,t,a){},151:function(e,t,a){},153:function(e,t,a){},321:function(e,t,a){"use strict";a.r(t);var s=a(0),r=a.n(s),i=a(19),n=a.n(i),l=(a(151),a(152),a(153),a(47)),c=a(48),h=a(57),d=a(56),o=a(325),u=a(326),j=a(58),O=(a(114),a(3)),f=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).state={data:[],loading:!1,humidityData:{},pressureData:{},temperatureData:{},dates:{}},s}return Object(c.a)(a,[{key:"componentWillMount",value:function(){var e=this;this._fetchData(),setInterval((function(){e._fetchData()}),3e5)}},{key:"_fetchData",value:function(){var e=this;this.setState({loading:!0}),fetch("/api/csv").then((function(e){if(200===e.status)return e.json();throw new Error(e.json())})).then((function(t){e.setState({success:!0,data:t.splice(-20,20),loading:!1}),e.transformData()})).catch((function(t){e.setState({success:!1,loading:!1}),o.a.error("Failed to fetch from API")}))}},{key:"transformData",value:function(){this.setState({dates:this.state.data.map((function(e,t){var a=new Date(1*e.date);return a.getHours()+":"+("0"+a.getMinutes()).substr(-2)}))}),this.setState({humidityData:{labels:this.state.dates,datasets:[{label:"Humidity (%)",data:this.state.data.map((function(e){return e.humidity})),fill:!0,backgroundColor:"rgba(255, 214, 165, 0.3)"}]},temperatureData:{labels:this.state.dates,datasets:[{label:"Temperature (C)",data:this.state.data.map((function(e){return e.temperature})),fill:!0,backgroundColor:"rgba(202, 255, 191, 0.3)"}]},pressureData:{labels:this.state.dates,datasets:[{label:"Air Pressure (Millibars)",data:this.state.data.map((function(e){return e.pressure})),fill:!0,backgroundColor:"rgba(255, 173, 173, 0.3)"}]}})}},{key:"render",value:function(){var e=this.state,t=e.humidityData,a=e.pressureData,s=e.temperatureData;return Object(O.jsxs)(u.a,{bordered:!0,className:"data-list",children:[Object(O.jsx)(j.Line,{data:s}),Object(O.jsx)(j.Line,{data:t}),Object(O.jsx)(j.Line,{data:a})]})}}]),a}(r.a.Component),b=a(144),m=a(324),p=a(322),T=a(323),x=a(327),g=function(e){return Object(O.jsx)(b.a,{children:Object(O.jsxs)("i",{children:["Automatically email me when temperature is above ",Math.floor(e)," C"]})})},v=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(l.a)(this,a),(s=t.call(this,e)).state={data:[],humidity:0,pressure:0,temperature:0,loading:!1,fanThreshold:50,waterThresholdTOP:40,waterThresholdBOTTOM:60,emailThreshold:50,fanSlider:void 0,emailSlider:void 0,waterSliderBOTTOM:void 0,waterSliderTOP:void 0,fan:1},s}return Object(c.a)(a,[{key:"componentWillMount",value:function(){var e=this;this._fetchData(),setInterval((function(){e._fetchData()}),5e3),setInterval((function(){e.state.emailSlider===e.state.emailThreshold&&e.state.fanSlider===e.state.fanThreshold&&e.state.waterSliderBOTTOM===e.state.waterThresholdBOTTOM&&e.state.waterSliderTOP===e.state.waterThresholdTOP||(e._updateConfig(e.state.fanSlider,e.state.emailSlider,e.state.waterSliderTOP,e.state.waterSliderBOTTOM),e._fetchData())}),2e3)}},{key:"_fetchData",value:function(){var e=this;this.setState({loading:!0}),fetch("/api/stats").then((function(e){if(200===e.status)return e.json();throw new Error(e.json())})).then((function(t){console.log(t),e.setState({success:!0,temperature:t.Temperature,humidity:t.Humidity,pressure:t.Pressure,fan:t.FanStatus,water:t.WaterStatus,emailThreshold:t.thresholds.emailThreshold,fanThreshold:t.thresholds.fanThreshold,waterThresholdBOTTOM:t.thresholds.waterThresholdBOTTOM,waterThresholdTOP:t.thresholds.waterThresholdTOP,emailSlider:e.state.emailSlider||t.thresholds.emailThreshold,fanSlider:e.state.fanSlider||t.thresholds.fanThreshold,waterSlider:e.state.waterSlider||t.thresholds.waterThreshold,data:t,loading:!1})})).catch((function(t){e.setState({success:!1,loading:!1}),o.a.error("Failed to fetch from API")}))}},{key:"_updateConfig",value:function(e,t,a,s){var r=this;if(!0!==this.state.updating){this.setState({updating:!0});var i={emailThreshold:t,fanThreshold:e,waterThresholdTOP:a,waterThresholdBOTTOM:s};fetch("/api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)}).then((function(e){if(r.setState({updating:!1}),200!==e.status)throw new Error(e.json())})).catch((function(e){r.setState({updating:!1}),console.log(e),o.a.error("Failed to fetch from API")}))}}},{key:"render",value:function(){var e,t,a=this;return Object(O.jsxs)(m.a,{className:"data-list",bordered:!0,children:[Object(O.jsx)(m.a.Item,{index:0,children:Object(O.jsxs)("div",{className:"logo-text",children:[Object(O.jsx)("img",{src:"/logo256.png",alt:"logo",className:"logo"}),Object(O.jsx)("h2",{children:"Pi Dashboard"})]})},0),Object(O.jsx)(m.a.Item,{index:1,children:this.state.success?Object(O.jsx)("p",{style:{color:"green"},children:"Status: Online"}):Object(O.jsx)("p",{style:{color:"red"},children:"Status: Offline"})},1),Object(O.jsx)(m.a.Item,{index:2,children:"Temperature: "+Math.floor(this.state.temperature)+" C"},2),Object(O.jsx)(m.a.Item,{index:3,children:"Humidity: "+Math.floor(this.state.humidity)+" %"},3),Object(O.jsx)(m.a.Item,{index:4,children:"Pressure: "+Math.floor(this.state.pressure)+" Millibars"},4),Object(O.jsx)(m.a.Item,{index:5,children:Object(O.jsx)("div",{className:"toggle-list",children:Object(O.jsx)("div",{children:0===this.state.fan?Object(O.jsx)("p",{style:{color:"green"},children:"Fan Status: Online"}):Object(O.jsx)("p",{style:{color:"red"},children:"Fan Status: Offline"})})})},5),Object(O.jsx)(m.a.Item,{index:6,children:Object(O.jsx)("div",{className:"toggle-list",children:Object(O.jsx)("div",{children:0===this.state.water?Object(O.jsx)("p",{style:{color:"green"},children:"Water Status: Online"}):Object(O.jsx)("p",{style:{color:"red"},children:"Water Status: Offline"})})})},6),Object(O.jsx)(m.a.Item,{index:7,children:Object(O.jsxs)("div",{className:"toggle-slider",children:[Object(O.jsx)("div",{children:Object(O.jsx)(p.a,{placement:"top",trigger:"hover",speaker:(t=this.state.fanThreshold,Object(O.jsx)(b.a,{children:Object(O.jsxs)("i",{children:["Automatically turn fan on when temperature is above ",Math.floor(t)," C"]})})),children:Object(O.jsx)("p",{children:"Fan Threshold (Temperature)"})})}),Object(O.jsx)("div",{children:this.state.success&&Object(O.jsx)(T.a,{defaultValue:this.state.fanThreshold,onChange:function(e){return a.setState({fanSlider:e})},progress:!0})})]})},7),Object(O.jsx)(m.a.Item,{index:8,children:Object(O.jsxs)("div",{className:"toggle-slider",children:[Object(O.jsx)("div",{children:Object(O.jsx)(p.a,{placement:"top",trigger:"hover",speaker:g(this.state.emailThreshold),children:Object(O.jsx)("p",{children:"SMS Threshold (Temperature)"})})}),Object(O.jsx)("div",{children:this.state.success&&Object(O.jsx)(T.a,{defaultValue:this.state.emailThreshold,onChange:function(e){return a.setState({emailSlider:e})},progress:!0})})]})},8),Object(O.jsx)(m.a.Item,{index:9,children:Object(O.jsxs)("div",{className:"toggle-slider",children:[Object(O.jsx)("div",{children:Object(O.jsx)(p.a,{placement:"top",trigger:"hover",speaker:(e=this.state.waterThreshold,Object(O.jsx)(b.a,{children:Object(O.jsxs)("i",{children:["Automatically turn on water vapor when below ",Math.floor(e)," %"]})})),children:Object(O.jsx)("p",{children:"Humidity Threshold"})})}),Object(O.jsx)("div",{children:this.state.success&&Object(O.jsx)(x.a,{defaultValue:[this.state.waterThresholdBOTTOM,this.state.waterThresholdTOP],onChange:function(e){return a.setState({waterSliderBOTTOM:e[0],waterSliderTOP:e[1]})}})})]})},9)]})}}]),a}(r.a.Component);var S=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)("header",{className:"App-header",children:[Object(O.jsx)(v,{}),Object(O.jsx)(f,{})]})})};n.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(S,{})}),document.getElementById("root"))}},[[321,1,2]]]);
//# sourceMappingURL=main.f7536f21.chunk.js.map