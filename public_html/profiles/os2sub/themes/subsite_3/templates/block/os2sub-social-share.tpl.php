<?php
$title = $variables['current_node']['title'];
$url = $variables['current_node']['url'];
?>

<!-- Begin - share -->
<div class="share">

  <div class="share__item">

    <!-- Begin - button -->
    <button type="button" class="btn btn-default share__item__toggle">
      <span class="fa fa-share"></span> Del opslaget
    </button>
    <!-- End - button -->

    <!-- Begin - popup -->
    <div class="share__item__popup">
      <div class="share__item__social-list">

        <!-- Begin - twitter -->
        <a class="share__item__social-list__item share__item__social-list__item--twitter" href="http://twitter.com/intent/tweet?status=<?php print $title; ?>+<?php print $url; ?>" title="Del på Twitter" target="_blank">
          <span class="icon fa fa-twitter"></span>
        </a>
        <!-- End - twitter -->

        <!-- Begin - facebook -->
        <a class="share__item__social-list__item share__item__social-list__item--facebook" href="http://www.facebook.com/sharer/sharer.php?u=<?php print $url; ?>&amp;title=<?php print $title; ?>" title="Del på Facebook" target="_blank">
          <span class="icon fa fa-facebook"></span>
        </a>
        <!-- End - facebook -->

        <!-- Begin - linkedin -->
        <a class="share__item__social-list__item share__item__social-list__item--linkedin" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php print $url; ?>&amp;title=<?php print $title; ?>" title="Del på LinkedIn" target="_blank">
          <span class="icon fa fa-linkedin"></span>
        </a>
        <!-- End - linkedin -->

      </div>
    </div>
    <!-- End - popup -->

  </div>

  <div class="share__item">

    <!-- Begin - print -->
    <button type="button" class="btn btn-default" onclick="printDOM();">
      <span class="fa fa-print"></span> Print
    </button>
    <!-- End - print -->

  </div>

</div>
<!-- End - share -->

<script>
    function printDOM() {
        window.print();
    }
</script>
