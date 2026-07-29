<?php
/**
 * One featured project, presented as a full-width product section.
 *
 * @var array $project  An entry from $featuredProjects.
 * @var int   $position 1-based index, shown as the section's counter.
 */
?>
<section
  class="feature <?php echo $project['surface']; ?>"
  id="project-<?php echo $project['id']; ?>"
  aria-labelledby="project-<?php echo $project['id']; ?>-title"
>
  <div class="container">
    <div class="feature__head reveal">
      <p class="feature__index">
        Project <?php echo str_pad((string) $position, 2, '0', STR_PAD_LEFT); ?>
      </p>

      <?php if (!empty($project['logo'])): ?>
        <img
          class="feature__logo"
          src="<?php echo htmlspecialchars($project['logo']['src']); ?>"
          alt="<?php echo htmlspecialchars($project['logo']['alt']); ?>"
          width="<?php echo (int) $project['logo']['width']; ?>"
          height="<?php echo (int) $project['logo']['height']; ?>"
          loading="lazy"
          decoding="async"
        />
      <?php endif; ?>
      <h3 class="project-title" id="project-<?php echo $project['id']; ?>-title">
        <?php echo htmlspecialchars($project['name']); ?>
      </h3>
      <p class="body-large feature__lead"><?php echo htmlspecialchars($project['tagline']); ?></p>

      <?php if (!empty($project['tech'])): ?>
        <ul class="tag-list feature__tags">
          <?php foreach ($project['tech'] as $tech): ?>
            <li class="tag"><?php echo htmlspecialchars($tech); ?></li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>

      <div class="btn-row btn-row--center">
        <?php foreach ($project['links'] as $link): ?>
          <?php $external = strpos($link['url'], 'http') === 0; ?>
          <a
            class="btn <?php echo $link['style']; ?>"
            href="<?php echo htmlspecialchars($link['url']); ?>"
            <?php echo $external ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
          >
            <span><?php echo htmlspecialchars($link['label']); ?></span>
            <span class="visually-hidden">— <?php echo htmlspecialchars($project['name']); ?></span>
            <i class="bi bi-<?php echo $link['icon']; ?>" aria-hidden="true"></i>
          </a>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="feature__media <?php echo $project['media_modifier']; ?> reveal">
      <div class="frame frame--natural frame--raised">
        <?php if (!empty($project['video'])): ?>
          <video
            controls
            playsinline
            muted
            loop
            preload="metadata"
            poster="<?php echo htmlspecialchars($project['video']['poster']); ?>"
            width="<?php echo (int) $project['video']['width']; ?>"
            height="<?php echo (int) $project['video']['height']; ?>"
          >
            <source src="<?php echo htmlspecialchars($project['video']['src']); ?>" type="video/mp4" />
            <p class="body-sm">
              <?php echo htmlspecialchars($project['video']['label']); ?>
              <a href="<?php echo htmlspecialchars($project['video']['src']); ?>">Download the recording</a>.
            </p>
          </video>
          <p class="visually-hidden"><?php echo htmlspecialchars($project['video']['label']); ?></p>
        <?php else: ?>
          <img
            src="<?php echo htmlspecialchars($project['image']['src']); ?>"
            alt="<?php echo htmlspecialchars($project['image']['alt']); ?>"
            width="<?php echo (int) $project['image']['width']; ?>"
            height="<?php echo (int) $project['image']['height']; ?>"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1160px) 92vw, 1120px"
          />
        <?php endif; ?>
      </div>
    </div>

    <dl class="feature__details reveal">
      <div class="feature__detail">
        <dt>What it is</dt>
        <dd><?php echo htmlspecialchars($project['summary']); ?></dd>
      </div>
      <div class="feature__detail">
        <dt>Context</dt>
        <dd><?php echo htmlspecialchars($project['context']); ?></dd>
      </div>
      <?php if (!empty($project['tech'])): ?>
        <div class="feature__detail">
          <dt>Stack</dt>
          <dd>
            <ul>
              <?php foreach ($project['tech'] as $tech): ?>
                <li><?php echo htmlspecialchars($tech); ?></li>
              <?php endforeach; ?>
            </ul>
          </dd>
        </div>
      <?php endif; ?>
    </dl>
  </div>
</section>
