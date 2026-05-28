import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dernek Tüzüğü | Puzzle Derneği',
};

export default function Tuzuk() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>DERNEK TÜZÜĞÜ</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
        }}>
          <div dangerouslySetInnerHTML={{ __html: `<!doctype html>
<html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0">
    <meta name="keywords" content="puzzle, Puzzle Derneği, türkiye puzzle,yap boz, puzzle oyna, puzzle yap">
    <meta name="description" content="Türkiye Puzzle Hız Yarışması">
    
    <title>Puzzle Derneği</title>
    
    <!-- FAVICON AND APPLE TOUCH -->    
    <link rel="shortcut icon" href="images/icons/favicon.png">
	<link rel="apple-touch-icon-precomposed" sizes="57x57" href="images/icons/apple-touch-57x57.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/icons/apple-touch-72x72.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/icons/apple-touch-114x114.png">
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/icons/apple-touch-144x144.png">
    
    <!-- FONTS -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic">
    
    
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,500,700' rel='stylesheet' type='text/css'>
    
    
    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css"> 
    
    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="assets/fontawesome/css/font-awesome.min.css">
    
    <!-- MIU ICON FONT -->
    <link rel="stylesheet" href="assets/miuiconfont/miuiconfont.css">
    
    <!-- FANCYBOX -->
    <link rel="stylesheet" href="assets/js/fancybox/jquery.fancybox.css">
    
    <!-- REVOLUTION SLIDER -->
    <link rel="stylesheet" href="assets/js/revolutionslider/css/settings.css">
    
    <!-- BxSLIDER -->
    <link rel="stylesheet" href="assets/js/bxslider/jquery.bxslider.css">
    
    <!-- YOUTUBE PLAYER -->
    <link rel="stylesheet" href="assets/js/ytplayer/css/YTPlayer.css">
    
    <!-- ANIMATIONS -->
    <link rel="stylesheet" href="assets/js/animations/animate.min.css">
    
    <!-- CUSTOM & PAGES STYLE -->
    <link rel="stylesheet" href="assets/css/custom.css">
    <link rel="stylesheet" href="assets/css/pages-style.css">
    
</head>

<body>

	<div id="page-wrapper">
        
        <!-- HEADER -->
        <header id="header">
            
            <div class="container">
                <div class="row">
                    <div class="col-sm-2">
                        
                        <!-- LOGO -->
                        <div id="logo">
        					<a href="index.php">
        						<img src="images/puzzle-logo-2.png" >
        					</a>
        				</div><!-- logo -->
                        
                    
                    <div class="col-sm-10">
                        
                       
                        <!-- MENU --> 
                        <nav>
                        
                            <a id="mobile-menu-button" href="#"><i class="fa fa-bars"></i></a>
                                             
                            <div class="scrollspy-menu">
                            
                                <ul class="menu nav clearfix" id="menu">
                                    <li><a href="index.php">ANA SAYFA</a></li>
                                </ul>
                                
                            </div><!-- onepage-menu -->
                        
                    	</nav>
                    
                    
                
                
                    
        </header><!-- HEADER -->
        
            
                    
            
            
             <section id="gecmis_puzzle_yarismalari">
            	
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                        	
                            
                        	
                                
                                <h2>TÜZÜK</h2>
                                
                            </div><!-- headline -->

                        
                    
                
                
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
							
                            ` }} />
        </div>
      </div>
    </div>
  );
}
