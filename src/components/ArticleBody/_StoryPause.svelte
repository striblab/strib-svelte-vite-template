<!-- 
@component
### story pause component
Renders a mock of the old school story pause dots.
-->

<script>
  /** @type {{children?: function}} */
  let { children } = $props();
</script>

<style>
.story-pause {
  margin: auto;
  min-width: 100%;
  padding: 40px 0 20px 0;
}
.ul .icons {
  margin: auto;
}
.icons li {
  background: none repeat scroll 0 0 #001e2b;
  height: 10px;
  width: 10px;
  margin-right: 15px;
  vertical-align: top;
  border-radius: 50%;
  display: inline-block;
}
</style>

<div class="story-pause"> 
<ul class="icons" style="
									margin: auto;
									width: 100%;
									text-align: center;
								">
									  <li></li>
									  <li></li>
									  <li></li>
									</ul>
								</div>