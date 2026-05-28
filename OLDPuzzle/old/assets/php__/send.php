<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load composer's autoloader
//require 'vendor/autoload.php';

include "Exception.php";
include "OAuth.php";
include "PHPMailer.php";
include "POP3.php";
include "SMTP.php";



$name 	 	= strip_tags(stripslashes($_POST['name']));
	$surname 	= strip_tags(stripslashes($_POST['surname']));
	$address 	= strip_tags(stripslashes($_POST['address']));
	$place 	 	= strip_tags(stripslashes($_POST['place']));
	$photo 	 	= strip_tags(stripslashes($_POST['photo']));
	$email 	 	= strip_tags(trim($_POST['email']));
	$phone 	 	= strip_tags(stripslashes($_POST['phone']));
	$identity	= strip_tags(stripslashes($_POST['identity']));


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'turkiyepuzzleyarismasi@gmail.com';                 // SMTP username
    $mail->Password = 'puzzle2016';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress("turkiyepuzzleyarismasi@gmail.com");

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Türkiye Puzzle Hız Yarışması';
    $mail->Body    = '<div>
					Adı: $name <br>
					Soyad: $surname <br>
					Katılmak İstediği Yer: $place <br>
					E-mail: $email <br>
					Cep Telefonu: $phone <br>
					</div>';
    $mail->AltBody = '-';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}


exit;



	$mail = new PHPMailer();
	
	
	$mail_yarismaci = new PHPMailer();
	
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 587;
	$mail->SMTPSecure = 'tls';
	$mail->SMTPAuth = true;
	$mail->Username = "turkiyepuzzleyarismasi@gmail.com";
	$mail->Password = "puzzle2016";
	$mail->addAddress('pelin.celik@ozensanas.com', 'Pelin Çelik');
	$mail->addAddress('turkiyepuzzleyarismasi@gmail.com', 'Türkiye Puzzle');
	$mail->Subject = 'Türkiye Puzzle Hız Yarışması';
	$mail->CharSet = 'UTF-8';
	$mail->setFrom($email, $name);
	$mail->addAttachment($dhedef.'/'.$dyeniadi);
	$mail->addAttachment($khedef.'/'.$kyeniadi);
	$mail->msgHTML("<div>
					Adı: $name <br>
					Soyad: $surname <br>
					Katılmak İstediği Yer: $place <br>
					E-mail: $email <br>
					Cep Telefonu: $phone <br>
					</div>");
					
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		
		$mail_yarismaci->isSMTP();
		$mail_yarismaci->Host = 'smtp.gmail.com';
		$mail_yarismaci->Port = 587;
		$mail_yarismaci->SMTPSecure = 'tls';
		$mail_yarismaci->SMTPAuth = true;
		$mail_yarismaci->Username = "turkiyepuzzleyarismasi@gmail.com";
		$mail_yarismaci->Password = "puzzle2016";
		$mail_yarismaci->addAddress($email, $name);
		$mail_yarismaci->Subject = 'Türkiye Puzzle Hız Yarışması';
		$mail_yarismaci->CharSet = 'UTF-8';
		$mail_yarismaci->setFrom('turkiyepuzzleyarismasi@gmail.com', 'Türkiye Puzzle Yarışması');
		$mail_yarismaci->msgHTML("<div>Sayın $name kaydınız başarılı bir şekilde bize ulaşmıştır, katıldığınız için teşekkür ederiz.</div>");
	    if (!$mail_yarismaci->send() ) {
		    echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
		    header('Location: http://turkiyepuzzle.com/?status=success&name='.$name.'&surname='.$surname);
		}
	}
