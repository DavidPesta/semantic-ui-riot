riot.tag2('demo-checkbox', '<h1 class="ui header"> Checkbox <div class="sub header">A checkbox allows a user to select a value from a small set of options, often binary</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Checkbox</h3> <p>A standard checkbox</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 0)}"></i> </div> <div class="ui segment {bottom: !example[0]} attached"> <su-checkbox checkbox="{checkbox}" ref="checkbox1"> Make my profile visible </su-checkbox> <span class="ui tag label {teal: refs.checkbox1.checked}">{refs.checkbox1.checked ? \'on\' : \'off\'}</span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[0]} "> <pre><code class="prettyprint">&lt;su-checkbox checkbox="\\{ checkbox \\}" ref="checkbox1"/&gt;\n  Make my profile visible\n&lt;/su-checkbox&gt;\n\n&lt;!-- checkbox state example --&gt;\n&lt;span class="ui tag label \\{teal: refs.checkbox1.checked\\}"&gt;\\{ refs.checkbox1.checked ? \'on\' : \'off\' \\}&lt;/span&gt;\n\n&lt;script&gt;\n  this.checkbox = \\{\n    checked: true,\n    action: () =&gt; \\{\n      // Called after checkbox is checked.\n      this.results.push(\'checkbox1 clicked\')\n      this.update()\n    \\}\n  \\}\n&lt;/script&gt;</code></pre> </div> <p>A standard checkbox with inline option</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 1)}"></i> </div> <div class="ui segment {bottom: !example[1]} attached"> <su-checkbox checked="{false}" action="{checkboxClick}" ref="checkbox2"> Make my profile visible </su-checkbox> <span class="ui tag label {teal: refs.checkbox2.checked}">{refs.checkbox2.checked ? \'on\' : \'off\'}</span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[1]} "> <pre><code class="prettyprint">&lt;su-checkbox checked="\\{ false \\}" action="\\{ checkboxClick \\}" ref="checkbox2"/&gt;\n  Make my profile visible\n&lt;/su-checkbox&gt;\n\n&lt;!-- checkbox state example --&gt;\n&lt;span class="ui tag label \\{teal: refs.checkbox2.checked\\}"&gt;\\{ refs.checkbox2.checked ? \'on\' : \'off\' \\}&lt;/span&gt;\n\n&lt;script&gt;\n  this.click = () =&gt; \\{\n    this.results.push(\'checkbox2 clicked\')\n    this.update()\n  \\}\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Radio</h3> <p>A checkbox can be formatted as a radio element. This means it is an exclusive option.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code link" onclick="{toggleExample.bind(this, 2)}"></i> </div> <div class="ui segment {bottom: !example[2]} attached"> <su-radio name="radio1" action="{radioClick}" value="1" checked="{radio1 == 1}"> Radio choice1 </su-radio> <su-radio name="radio1" action="{radioClick}" value="2" checked="{radio1 == 2}"> Radio choice2 </su-radio> <span class=" ui tag label">Radio choice{radio1}</span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[2]}"> <pre><code class="prettyprint">&lt;su-radio name="radio1" action="\\{ radioClick \\}" value="1" checked="\\{ radio1 == 1 \\}"&gt;\n  Radio choice1\n&lt;/su-radio&gt;\n&lt;su-radio name="radio1" action="\\{ radioClick \\}" value="2" checked="\\{ radio1 == 2 \\}""&gt;\n  Radio choice2\n&lt;/su-radio&gt;\n\n&lt;script&gt;\n  this.radio1 = 1\n  this.radioClick = val =&gt; \\{\n    this.radio1 = val\n    this.update()\n  \\}\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Slider</h3> <p>A checkbox can be formatted to emphasize the current selection state</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 3)}"></i> </div> <div class="ui segment {bottom: !example[3]} attached"> <su-checkbox type="{\'slider\'}"> Accept terms and conditions </su-checkbox> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[3]}"> <pre><code class="prettyprint">&lt;su-checkbox type="slider" /&gt;\n  Accept terms and conditions\n&lt;/su-checkbox&gt;</code></pre> </div> <p>A checkbox can be formatted to emphasize the current selection state</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 4)}"></i> </div> <div class="ui segment {bottom: !example[4]} attached"> <div class="ui form"> <div class="grouped fields"> <label>Outbound Throughput</label> <div class="field"> <su-radio type="{\'slider\'}" name="throughput"> 20 mbps max </su-radio> </div> <div class="field"> <su-radio type="{\'slider\'}" name="throughput"> 10mbps max </su-radio> </div> <div class="field"> <su-radio type="{\'slider\'}" name="throughput"> 5mbps max </su-radio> </div> <div class="field"> <su-radio type="{\'slider\'}" name="throughput"> Unmetered </su-radio> </div> </div> </div> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[4]} "> <pre><code class="prettyprint">&lt;div class=&quot;ui form&quot;&gt;\n  &lt;div class=&quot;grouped fields&quot;&gt;\n    &lt;label&gt;Outbound Throughput&lt;/label&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio type=&quot;\\{ &#039;slider&#039; \\}&quot; name=&quot;throughput&quot;&gt;\n        20 mbps max\n      &lt;/su-radio&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio type=&quot;\\{ &#039;slider&#039; \\}&quot; name=&quot;throughput&quot;&gt;\n        10mbps max\n      &lt;/su-radio&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio type=&quot;\\{ &#039;slider&#039; \\}&quot; name=&quot;throughput&quot;&gt;\n        5mbps max\n      &lt;/su-radio&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;field&quot;&gt;\n      &lt;su-radio type=&quot;\\{ &#039;slider&#039; \\}&quot; name=&quot;throughput&quot;&gt;\n        Unmetered\n      &lt;/su-radio&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;</code></pre> </div> <ul> <li each="{result in results}">{result}</li> </ul>', '', '', function(opts) {
'use strict';

var _this = this;

this.example = [];
this.toggleExample = function (index) {
  _this.example[index] = !_this.example[index];
};
this.results = [];

this.checkbox = {
  checked: true,
  action: function action() {
    _this.results.push('checkbox1 clicked');
    _this.update();
  }
};

this.checkboxClick = function () {
  _this.results.push('checkbox2 clicked');
  _this.update();
};

this.radio1 = 1;
this.radioClick = function (val) {
  _this.radio1 = val;
  _this.update();
};

this.on('mount', function () {
  PR.prettyPrint(false);
});
});