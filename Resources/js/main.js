var KitchenSink = {};
var Ti = {fs: Titanium.Filesystem};

KitchenSink.init = function()
{
	this.resourceDir = Ti.fs.getResourcesDirectory();

	this.topicMenu = $('#topic_menu');
	this.contentArea = $('#content');

	// Load all the topics
	KitchenSink.loadTopics();

	// Create topic menu accordion
	this.topicMenu.accordion();
}

KitchenSink.loadTopics = function()
{
	this.topics = [];

	var topicDir = Ti.fs.getFile(this.resourceDir, "topics");
	var sink = this;
	topicDir.getDirectoryListing().forEach(function(topicFile)
	{
		var topic = new KitchenSink.Topic(Ti.fs.getFileStream(topicFile));
		sink.contentArea.append(topic.contentDiv);
		sink.addTopicMenu(topic);
		sink.topics.push(topic);
	});

	this.currentTopic = this.topics[0];
	this.currentTopic.show();
}

KitchenSink.addTopicMenu = function(topic)
{
	// Create the topic header
	var header = $('<h3><a href="#">' + topic.name + '</a></h3>');
	header.click(function()
	{
		KitchenSink.currentTopic.hide();
		topic.show();
		KitchenSink.currentTopic = topic;
	});

	// Add topic sections
	var sectionList = $('<div>');
	topic.sections.forEach(function(section)
	{
		var subItem = $('<div class="section_item">' + section + '</div>');
		subItem.click(function()
		{
			document.getElementById(section.toLowerCase().replace(/ /g,"_")).scrollIntoView(true);
		});
		sectionList.append(subItem);
	});

	this.topicMenu.append(header);
	this.topicMenu.append(sectionList);
}

KitchenSink.Topic = function(file)
{
	file.open();
	// Load topic content text
	this.contentDiv = $('<div class="topic_content">');
	this.contentDiv.html(file.read().toString());
	this.contentDiv.hide();
	file.close();

	this.name = $('h1', this.contentDiv).first().text();

	var sections = [];
	$('h2', this.contentDiv).each(function()
	{
		sections.push($(this).text());
	});
	this.sections = sections;
}

KitchenSink.Topic.prototype.show = function()
{
	this.contentDiv.show();
}

KitchenSink.Topic.prototype.hide = function()
{
	this.contentDiv.hide();
}

$(document).ready(function()
{
	KitchenSink.init();
});