<?php if ($page['navigation']): ?>
  <?php print render($page['navigation']); ?>
<?php endif; ?>

<div class='front-main-container-wrapper'>
  <div class='main-container container'>
    <?php print render($page['header']); ?>
    <div class='row'>

      <!-- page--front.tpl.php-->
      <div class="col-sm-8  col-xs-12">          
          
        <?php if (theme_get_setting('welcome','svendborg_subsitetheme')) :?>
      <div class="welcome-text">
        <?php //$block_search_form = module_invoke('search', 'block_view', 'search'); ?>
        <?php $view = views_get_view('frontpage_welcome_text');
              print $view->render('svendborg_frontpage_welcome');
        ?>
      </div>
      <?php endif;?>
      <?php if (theme_get_setting('large_news','svendborg_subsitetheme')== 2) :?>
      <div class="news-block">
        <?php //$block_search_form = module_invoke('search', 'block_view', 'search'); ?>
        <?php $view = views_get_view('svendborg_news_view');
              print $view->render('block_5');
        ?>
      </div>
      <?php endif;?>
      <?php if (theme_get_setting('latest_news','svendborg_subsitetheme')== 2) :?>
      <div class="latest-news-block">
        <?php 
        
      $view = views_get_view('svendborg_news_view');
      $view->set_display('svendborg_latest_news');
      $view->set_offset(theme_get_setting('large_news','svendborg_subsitetheme'));
      $view->pre_execute();
      $view->execute();
      //var_dump(views_get_view_result('svendborg_news_view', 'svendborg_latest_news'));
      if (count( $view->result)>0) 
       print '<h2 class="block-title">' . t($view->get_title()) . '</h2>' . $view->render();
              
        ?>
      </div>
     <?php endif;?>
      </div>
      <div class="region region-sidebar-second col-sm-4 col-xs-12">
          <?php if (theme_get_setting('promoted_nodes','svendborg_subsitetheme') ):?>
       <div class="frontpage-nodes-block <?php (theme_get_setting('promoted_nodes_location','svendborg_subsitetheme') === 'slider')?  print 'hidden-sm hidden-md hidden-lg' : print ''?>">
        <?php //$block_search_form = module_invoke('search', 'block_view', 'search'); ?>
        <?php print _svendborg_subsitetheme_block_render('views', 'frontpage_nodes-block'); ?>
      </div>
      <?php endif;?>
     <?php if (theme_get_setting('activites','svendborg_subsitetheme')) :?>
      <div class="activites-block">
          <?php  print _svendborg_subsitetheme_block_render('views', 'aktiviteter-block_2'); ?>
      </div>
     <?php endif;?>
      </div>
      
      <div class="clearfix"></div>
      <?php if (theme_get_setting('large_news','svendborg_subsitetheme')==3) :?>
      <div class="news-block col-xs-12">
        <?php $view = views_get_view('svendborg_news_view');
              print $view->render('block_6');
        ?>
      </div>
     <?php endif;?>
      
      <div class="clearfix"></div>
      
      <?php if (theme_get_setting('large_news','svendborg_subsitetheme')==4) :?>
      <div class="news-block col-xs-12">
        <?php $view = views_get_view('svendborg_news_view');
        
              print $view->render('block_7');
        ?>
      </div>
     <?php endif;?>
      <?php if (theme_get_setting('latest_news','svendborg_subsitetheme')== 3) :?>      
      <div class="col-xs-12 latest-news-block with-top-line">
        <?php 
         $view = views_get_view('svendborg_news_view');
      $view->set_display('svendborg_latest_news_three_col');
      $view->set_offset(theme_get_setting('large_news','svendborg_subsitetheme'));
      $view->pre_execute();
      $view->execute();
      if (count( $view->result)>0)
            print '<h2 class="block-title">' . t($view->get_title()) . '</h2>' . $view->render();
              
        ?>
      </div>
     <?php endif;?>
    </div>
    <div class="clearfix"></div>
    
  </div>

  <!--<div class='front-main-container-shadow'></div> -->
</div>
<!--
<div class="lcontainer-fluid clearfix front-s-news">
  <div class="container front-s-news-inner">
    <div class="row">
      <?php //print $page['front_small_carousel']; ?>
    </div>
  </div>
</div>

<div class='lcontainer-fluid clearfix front-news-bottom'>
  <div class='container'>
    <div class='front-news-bottom-inner'>
      <div>
        <span>&#216;nsker du at se alle nyheder   <a href='/nyheder' class='btn btn-primary'>Klik her</a></span>
      </div>
    </div>
  </div>
</div> 
-->
<?php print render($page['footer']); ?>
