var articles = [];

function Article (options) {
/* DONE: This is our Model constructor. It will take in
   our source data from blogArticles and instantiate a
   new Object according to this new definition. options is
   a placeholder for the object that will ultimately be
   passed in. Use all of the properties in blogArticles
   to populate the new Article data that we'll use.  */
  this.title = options.title;
  this.category = options.category;
  this.author = options.author;
  this.authorUrl = options.authorUrl;
  this.publishedOn = options.publishedOn;
  this.body = options.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);
  /* DONE: We also need to fill in:
  1. author name X
  2. author url X
  3. article title X
  4. article body X
  5. publication*/
  $newArticle.find('h1').text(this.title);
  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('.article-body').html(this.body);


  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
/* DONE: This cloned article is no longer a template, as it now
has real data attached to it. Remove the class from this new article! */

  $newArticle.removeClass('template');

  return $newArticle;
};

/* This sort method is a standard JavaScript Array function
   that will iterate over an array and compare its values,
   and then arrange them in ascending or descending order
   according to the return value. We are comparing the
   publishedOn properties to arrange the blog posts in
   descending order (most recent first). */
blogArticles.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

blogArticles.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
