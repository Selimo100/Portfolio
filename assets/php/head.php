<?php
/**
 * Shared <head> partial.
 *
 * $pageTitle       string  Full document title.
 * $pageDescription string  Meta description.
 * $canonicalPath   string  Path appended to the site root for the canonical URL.
 * $pageStyles      array   Extra stylesheet paths, loaded after the base system.
 */
$siteUrl = 'https://selina.mogicato.ch';
$pageTitle = $pageTitle ?? 'Selina Mogicato — Application Developer';
$pageDescription = $pageDescription ?? 'Portfolio of Selina Mogicato, apprentice application developer from Switzerland.';
$canonicalPath = $canonicalPath ?? '/';
$pageStyles = $pageStyles ?? [];
?>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light dark" />

<title><?php echo htmlspecialchars($pageTitle); ?></title>
<meta name="description" content="<?php echo htmlspecialchars($pageDescription); ?>" />
<meta name="author" content="Selina Mogicato" />
<link rel="canonical" href="<?php echo htmlspecialchars($siteUrl . $canonicalPath); ?>" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Selina Mogicato" />
<meta property="og:title" content="<?php echo htmlspecialchars($pageTitle); ?>" />
<meta property="og:description" content="<?php echo htmlspecialchars($pageDescription); ?>" />
<meta property="og:url" content="<?php echo htmlspecialchars($siteUrl . $canonicalPath); ?>" />
<meta property="og:image" content="<?php echo $siteUrl; ?>/assets/images/Logo.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<?php echo htmlspecialchars($pageTitle); ?>" />
<meta name="twitter:description" content="<?php echo htmlspecialchars($pageDescription); ?>" />
<meta name="twitter:image" content="<?php echo $siteUrl; ?>/assets/images/Logo.png" />

<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
/>

<link rel="stylesheet" href="assets/css/tokens.css" />
<link rel="stylesheet" href="assets/css/base.css" />
<link rel="stylesheet" href="assets/css/components.css" />
<link rel="stylesheet" href="assets/css/layout.css" />
<?php foreach ($pageStyles as $style): ?>
<link rel="stylesheet" href="<?php echo htmlspecialchars($style); ?>" />
<?php endforeach; ?>

<link rel="icon" type="image/png" href="assets/images/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="assets/images/favicon/favicon.svg" />
<link rel="shortcut icon" href="assets/images/favicon/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="assets/images/favicon/apple-touch-icon.png" />
<link rel="manifest" href="assets/images/favicon/site.webmanifest" />

<script src="assets/js/theme-init.js"></script>
