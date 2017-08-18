riot.tag2('demo-dropdown', '<h1 class="ui header"> Dropdown <div class="sub header">A dropdown allows a user to select a value from a series of options</div> </h1> <h2 class="ui dividing header">Types<a class="anchor" id="types"></a></h2> <h3 class="ui header">Selection</h3> <p>A dropdown can be used to select between choices in a form</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 0)}"></i> </div> <div class="ui segment {bottom: !example[0]} attached"> <su-dropdown items="{dropdownItems}" ref="dropdown1"></su-dropdown> <span class="ui tag label {teal: refs.dropdown1.value}"> {refs.dropdown1.value} {refs.dropdown1.label} </span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[0]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Gender&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;Male&#039;,\n      value: 1\n    \\},\n    \\{\n      label: &#039;Female&#039;,\n      value: 2\n    \\},\n  ]\n&lt;/script&gt;</code></pre> </div> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 8)}"></i> </div> <div class="ui segment {bottom: !example[8]} attached"> <su-dropdown items="{dropdownItems9}" class="fluid"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[8]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; class=&quot;fluid&quot; &gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Select Friend&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;Jenny Hess&#039;,\n      image: &#039;/images/avatar/small/jenny.jpg&#039;,\n      value: &#039;jenny&#039;\n    \\},\n    \\{\n      label: &#039;Elliot Fu&#039;,\n      image: &#039;/images/avatar/small/elliot.jpg&#039;,\n      value: &#039;elliot&#039;\n    \\},\n    \\{\n      label: &#039;Stevie Feliciano&#039;,\n      image: &#039;/images/avatar/small/stevie.jpg&#039;,\n      value: &#039;stevie&#039;\n    \\},\n    \\{\n      label: &#039;Christian&#039;,\n      image: &#039;/images/avatar/small/christian.jpg&#039;,\n      value: &#039;christian&#039;\n    \\},\n    \\{\n      label: &#039;Matt&#039;,\n      image: &#039;/images/avatar/small/matt.jpg&#039;,\n      value: &#039;matt&#039;\n    \\},\n    \\{\n      label: &#039;Justen Kitsune&#039;,\n      image: &#039;/images/avatar/small/justen.jpg&#039;,\n      value: &#039;justen&#039;\n    \\}\n  ]\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Search Selection</h3> <p>A selection dropdown can allow a user to search through a large list of choices.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 1)}"></i> </div> <div class="ui segment {bottom: !example[1]} attached"> <su-dropdown items="{dropdownItems2}" search="true" ref="dropdown2"></su-dropdown> <span class="ui tag label {teal: refs.dropdown2.value}"> {refs.dropdown2.value} {refs.dropdown2.label} </span> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[1]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; search=&quot;true&quot; ref=&quot;dropdown2&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;!-- dropdown state example --&gt;\n&lt;span class=&quot;ui tag label \\{teal: refs.dropdown2.value \\}&quot;&gt;\n  \\{ refs.dropdown2.value \\}\n  \\{ refs.dropdown2.label \\}\n&lt;/span&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;State&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{ value: &#039;AL&#039;, label: &#039;Alabama&#039; \\},\n    \\{ value: &#039;AK&#039;, label: &#039;Alaska&#039; \\},\n    \\{ value: &#039;AZ&#039;, label: &#039;Arizona&#039; \\},\n    \\{ value: &#039;AR&#039;, label: &#039;Arkansas&#039; \\},\n    \\{ value: &#039;CA&#039;, label: &#039;California&#039; \\},\n    \\{ value: &#039;CO&#039;, label: &#039;Colorado&#039; \\},\n    \\{ value: &#039;CT&#039;, label: &#039;Connecticut&#039; \\},\n    \\{ value: &#039;DE&#039;, label: &#039;Delaware&#039; \\},\n    \\{ value: &#039;DC&#039;, label: &#039;District Of Columbia&#039; \\},\n    \\{ value: &#039;FL&#039;, label: &#039;Florida&#039; \\},\n    \\{ value: &#039;GA&#039;, label: &#039;Georgia&#039; \\},\n    \\{ value: &#039;HI&#039;, label: &#039;Hawaii&#039; \\},\n    \\{ value: &#039;ID&#039;, label: &#039;Idaho&#039; \\},\n    \\{ value: &#039;IL&#039;, label: &#039;Illinois&#039; \\},\n    \\{ value: &#039;IN&#039;, label: &#039;Indiana&#039; \\},\n    \\{ value: &#039;IA&#039;, label: &#039;Iowa&#039; \\},\n    \\{ value: &#039;KS&#039;, label: &#039;Kansas&#039; \\},\n    \\{ value: &#039;KY&#039;, label: &#039;Kentucky&#039; \\},\n    \\{ value: &#039;LA&#039;, label: &#039;Louisiana&#039; \\},\n    \\{ value: &#039;ME&#039;, label: &#039;Maine&#039; \\},\n    \\{ value: &#039;MD&#039;, label: &#039;Maryland&#039; \\},\n    \\{ value: &#039;MA&#039;, label: &#039;Massachusetts&#039; \\},\n    \\{ value: &#039;MI&#039;, label: &#039;Michigan&#039; \\},\n    \\{ value: &#039;MN&#039;, label: &#039;Minnesota&#039; \\},\n    \\{ value: &#039;MS&#039;, label: &#039;Mississippi&#039; \\},\n    \\{ value: &#039;MO&#039;, label: &#039;Missouri&#039; \\},\n    \\{ value: &#039;MT&#039;, label: &#039;Montana&#039; \\},\n    \\{ value: &#039;NE&#039;, label: &#039;Nebraska&#039; \\},\n    \\{ value: &#039;NV&#039;, label: &#039;Nevada&#039; \\},\n    \\{ value: &#039;NH&#039;, label: &#039;New Hampshire&#039; \\},\n    \\{ value: &#039;NJ&#039;, label: &#039;New Jersey&#039; \\},\n    \\{ value: &#039;NM&#039;, label: &#039;New Mexico&#039; \\},\n    \\{ value: &#039;NY&#039;, label: &#039;New York&#039; \\},\n    \\{ value: &#039;NC&#039;, label: &#039;North Carolina&#039; \\},\n    \\{ value: &#039;ND&#039;, label: &#039;North Dakota&#039; \\},\n    \\{ value: &#039;OH&#039;, label: &#039;Ohio&#039; \\},\n    \\{ value: &#039;OK&#039;, label: &#039;Oklahoma&#039; \\},\n    \\{ value: &#039;OR&#039;, label: &#039;Oregon&#039; \\},\n    \\{ value: &#039;PA&#039;, label: &#039;Pennsylvania&#039; \\},\n    \\{ value: &#039;RI&#039;, label: &#039;Rhode Island&#039; \\},\n    \\{ value: &#039;SC&#039;, label: &#039;South Carolina&#039; \\},\n    \\{ value: &#039;SD&#039;, label: &#039;South Dakota&#039; \\},\n    \\{ value: &#039;TN&#039;, label: &#039;Tennessee&#039; \\},\n    \\{ value: &#039;TX&#039;, label: &#039;Texas&#039; \\},\n    \\{ value: &#039;UT&#039;, label: &#039;Utah&#039; \\},\n    \\{ value: &#039;VT&#039;, label: &#039;Vermont&#039; \\},\n    \\{ value: &#039;VA&#039;, label: &#039;Virginia&#039; \\},\n    \\{ value: &#039;WA&#039;, label: &#039;Washington&#039; \\},\n    \\{ value: &#039;WV&#039;, label: &#039;West Virginia&#039; \\},\n    \\{ value: &#039;WI&#039;, label: &#039;Wisconsin&#039; \\},\n    \\{ value: &#039;WY&#039;, label: &#039;Wyoming&#039; \\}\n  ]\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Multiple Selection</h3> <p>A selection dropdown can allow multiple selections</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 7)}"></i> </div> <div class="ui segment {bottom: !example[7]} attached"> <su-dropdown items="{dropdownItems8}" multiple="true"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[7]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot; multiple=&quot;true&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    {label: &#039;Skills&#039;,       value: null,       default: true},\n    {value: &#039;angular&#039;, label: &#039;Angular&#039;},\n    {value: &#039;css&#039;, label: &#039;CSS&#039;},\n    {value: &#039;design&#039;, label: &#039;Graphic Design&#039;},\n    {value: &#039;ember&#039;, label: &#039;Ember&#039;},\n    {value: &#039;html&#039;, label: &#039;HTML&#039;},\n    {value: &#039;ia&#039;, label: &#039;Information Architecture&#039;},\n    {value: &#039;javascript&#039;, label: &#039;Javascript&#039;},\n    {value: &#039;mech&#039;, label: &#039;Mechanical Engineering&#039;},\n    {value: &#039;meteor&#039;, label: &#039;Meteor&#039;},\n    {value: &#039;node&#039;, label: &#039;NodeJS&#039;},\n    {value: &#039;plumbing&#039;, label: &#039;Plumbing&#039;},\n    {value: &#039;python&#039;, label: &#039;Python&#039;},\n    {value: &#039;rails&#039;, label: &#039;Rails&#039;},\n    {value: &#039;react&#039;, label: &#039;React&#039;},\n    {value: &#039;repair&#039;, label: &#039;Kitchen Repair&#039;},\n    {value: &#039;ruby&#039;, label: &#039;Ruby&#039;},\n    {value: &#039;ui&#039;, label: &#039;UI Design&#039;},\n    {value: &#039;ux&#039;, label: &#039;User Experience&#039;}\n  ]\n&lt;/script&gt;</code></pre> </div> <h2 class="ui dividing header">Content<a class="anchor" id="content"></a></h2> <h3 class="ui header">Header</h3> <p>A dropdown menu can contain a header</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 2)}"></i> </div> <div class="ui segment {bottom: !example[2]} attached"> <su-dropdown items="{dropdownItems3}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[2]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Filter&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;Filter by tag&#039;,\n      icon: &#039;tags&#039;,\n      header: true\n    \\},\n    \\{\n      label: &#039;Important&#039;,\n      value: 1\n    \\},\n    \\{\n      label: &#039;Announcement&#039;,\n      value: 2\n    \\},\n    \\{\n      label: &#039;Discussion&#039;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Divider</h3> <p>A dropdown menu can contain dividers to separate related content</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 3)}"></i> </div> <div class="ui segment {bottom: !example[3]} attached"> <su-dropdown items="{dropdownItems4}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[3]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Filter&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;Filter by tag&#039;,\n      icon: &#039;tags&#039;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &#039;Important&#039;,\n      value: 1\n    \\},\n    \\{\n      label: &#039;Announcement&#039;,\n      value: 2\n    \\},\n    \\{\n      label: &#039;Discussion&#039;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Icon</h3> <p>A dropdown menu can contain an <a href="https://semantic-ui.com/elements/icon.html">icon</a>.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 4)}"></i> </div> <div class="ui segment {bottom: !example[4]} attached"> <su-dropdown items="{dropdownItems5}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[4]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Filter&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;Filter by tag&#039;,\n      icon: &#039;tags&#039;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &#039;Important&#039;,\n      icon: &#039;attention&#039;,\n      value: 1\n    \\},\n    \\{\n      label: &#039;Announcement&#039;,\n      icon: &#039;comment&#039;,\n      value: 2\n    \\},\n    \\{\n      label: &#039;Discussion&#039;,\n      icon: &#039;conversation&#039;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Description</h3> <p>A dropdown menu can contain a description.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 5)}"></i> </div> <div class="ui segment {bottom: !example[5]} attached"> <su-dropdown items="{dropdownItems6}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[5]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Filter Tags&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;Filter by tag&#039;,\n      header: true\n    \\},\n    \\{\n      divider: true\n    \\},\n    \\{\n      label: &#039;Important&#039;,\n      description: &#039;2 new&#039;,\n      value: 1\n    \\},\n    \\{\n      label: &#039;Hopper&#039;,\n      description: &#039;10 new&#039;,\n      value: 2\n    \\},\n    \\{\n      label: &#039;Discussion&#039;,\n      description: &#039;5 new&#039;,\n      value: 3\n    \\}\n  ]\n&lt;/script&gt;</code></pre> </div> <h3 class="ui header">Image</h3> <p>A dropdown menu can contain an image.</p> <div class="ui segment secondary top attached example"> Example <i class="icon code" onclick="{toggleExample.bind(this, 6)}"></i> </div> <div class="ui segment {bottom: !example[6]} attached"> <su-dropdown items="{dropdownItems7}"></su-dropdown> </div> <div class="ui segment bottom attached inverted transition {hidden: !example[6]} "> <pre><code class="prettyprint">&lt;su-dropdown items=&quot;\\{ dropdownItems \\}&quot;&gt;&lt;/su-dropdown&gt;\n\n&lt;script&gt;\n  this.dropdownItems = [\n    \\{\n      label: &#039;Add User&#039;,\n      value: null,\n      default: true\n    \\},\n    \\{\n      label: &#039;People You Might Know&#039;,\n      header: true\n    \\},\n    \\{\n      label: &#039;Jenny Hess&#039;,\n      image: &#039;/images/avatar/small/jenny.jpg&#039;,\n      value: &#039;jenny&#039;\n    \\},\n    \\{\n      label: &#039;Elliot Fu&#039;,\n      image: &#039;/images/avatar/small/elliot.jpg&#039;,\n      value: &#039;elliot&#039;\n    \\},\n    \\{\n      label: &#039;Stevie Feliciano&#039;,\n      image: &#039;/images/avatar/small/stevie.jpg&#039;,\n      value: &#039;stevie&#039;\n    \\},\n    \\{\n      label: &#039;Your Friends\\&#039; Friends&#039;,\n      header: true\n    \\},\n    \\{\n      label: &#039;Christian&#039;,\n      image: &#039;/images/avatar/small/christian.jpg&#039;,\n      value: &#039;christian&#039;\n    \\},\n    \\{\n      label: &#039;Matt&#039;,\n      image: &#039;/images/avatar/small/matt.jpg&#039;,\n      value: &#039;matt&#039;\n    \\},\n    \\{\n      label: &#039;Justen Kitsune&#039;,\n      image: &#039;/images/avatar/small/justen.jpg&#039;,\n      value: &#039;justen&#039;\n    \\}\n  ]\n&lt;/script&gt;</code></pre> </div>', '', '', function(opts) {
'use strict';

var _this = this;

this.example = [];
this.toggleExample = function (index) {
  _this.example[index] = !_this.example[index];
};
this.dropdownItems = [{
  label: 'Gender',
  value: null,
  default: true
}, {
  label: 'Male',
  value: 1
}, {
  label: 'Female',
  value: 2
}];
this.dropdownItems2 = [{
  label: 'State',
  value: null,
  default: true
}, { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];
this.dropdownItems3 = [{
  label: 'Filter',
  value: null,
  default: true
}, {
  label: 'Filter by tag',
  icon: 'tags',
  header: true
}, {
  label: 'Important',
  value: 1
}, {
  label: 'Announcement',
  value: 2
}, {
  label: 'Discussion',
  value: 3
}];

this.dropdownItems4 = [{
  label: 'Filter',
  value: null,
  default: true
}, {
  label: 'Filter by tag',
  icon: 'tags',
  header: true
}, {
  divider: true
}, {
  label: 'Important',
  value: 1
}, {
  label: 'Announcement',
  value: 2
}, {
  label: 'Discussion',
  value: 3
}];

this.dropdownItems5 = [{
  label: 'Filter',
  value: null,
  default: true
}, {
  label: 'Filter by tag',
  icon: 'tags',
  header: true
}, {
  divider: true
}, {
  label: 'Important',
  icon: 'attention',
  value: 1
}, {
  label: 'Announcement',
  icon: 'comment',
  value: 2
}, {
  label: 'Discussion',
  icon: 'conversation',
  value: 3
}];

this.dropdownItems6 = [{
  label: 'Filter Tags',
  value: null,
  default: true
}, {
  label: 'Filter by tag',
  header: true
}, {
  divider: true
}, {
  label: 'Important',
  description: '2 new',
  value: 1
}, {
  label: 'Hopper',
  description: '10 new',
  value: 2
}, {
  label: 'Discussion',
  description: '5 new',
  value: 3
}];

this.dropdownItems7 = [{
  label: 'Add User',
  value: null,
  default: true
}, {
  label: 'People You Might Know',
  header: true
}, {
  label: 'Jenny Hess',
  image: '/images/avatar/small/jenny.jpg',
  value: 'jenny'
}, {
  label: 'Elliot Fu',
  image: '/images/avatar/small/elliot.jpg',
  value: 'elliot'
}, {
  label: 'Stevie Feliciano',
  image: '/images/avatar/small/stevie.jpg',
  value: 'stevie'
}, {
  label: 'Your Friends\' Friends',
  header: true
}, {
  label: 'Christian',
  image: '/images/avatar/small/christian.jpg',
  value: 'christian'
}, {
  label: 'Matt',
  image: '/images/avatar/small/matt.jpg',
  value: 'matt'
}, {
  label: 'Justen Kitsune',
  image: '/images/avatar/small/justen.jpg',
  value: 'justen'
}];

this.dropdownItems8 = [{
  label: 'Skills',
  value: null,
  default: true
}, { value: 'angular', label: 'Angular' }, { value: 'css', label: 'CSS' }, { value: 'design', label: 'Graphic Design' }, { value: 'ember', label: 'Ember' }, { value: 'html', label: 'HTML' }, { value: 'ia', label: 'Information Architecture' }, { value: 'javascript', label: 'Javascript' }, { value: 'mech', label: 'Mechanical Engineering' }, { value: 'meteor', label: 'Meteor' }, { value: 'node', label: 'NodeJS' }, { value: 'plumbing', label: 'Plumbing' }, { value: 'python', label: 'Python' }, { value: 'rails', label: 'Rails' }, { value: 'react', label: 'React' }, { value: 'repair', label: 'Kitchen Repair' }, { value: 'ruby', label: 'Ruby' }, { value: 'ui', label: 'UI Design' }, { value: 'ux', label: 'User Experience' }];

this.dropdownItems9 = [{
  label: 'Select Friend',
  value: null,
  default: true
}, {
  label: 'Jenny Hess',
  image: '/images/avatar/small/jenny.jpg',
  value: 'jenny'
}, {
  label: 'Elliot Fu',
  image: '/images/avatar/small/elliot.jpg',
  value: 'elliot'
}, {
  label: 'Stevie Feliciano',
  image: '/images/avatar/small/stevie.jpg',
  value: 'stevie'
}, {
  label: 'Christian',
  image: '/images/avatar/small/christian.jpg',
  value: 'christian'
}, {
  label: 'Matt',
  image: '/images/avatar/small/matt.jpg',
  value: 'matt'
}, {
  label: 'Justen Kitsune',
  image: '/images/avatar/small/justen.jpg',
  value: 'justen'
}];

this.on('mount', function () {
  PR.prettyPrint(false);
});
});