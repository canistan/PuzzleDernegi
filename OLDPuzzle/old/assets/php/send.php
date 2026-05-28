<?php
	
	
	include "class.phpmailer.php";
	include "class.smtp.php";

	$name 	 	= strip_tags(stripslashes($_POST['name']));
	$surname 	= strip_tags(stripslashes($_POST['surname']));
	$address 	= strip_tags(stripslashes($_POST['address']));
	$place 	 	= strip_tags(stripslashes($_POST['place']));
	$photo 	 	= strip_tags(stripslashes($_POST['photo']));
	$email 	 	= strip_tags(trim($_POST['email']));
	$phone 	 	= strip_tags(stripslashes($_POST['phone']));
	$identity	= strip_tags(stripslashes($_POST['identity']));
	$city		= strip_tags(stripslashes($_POST['city']));
	
	$dkaynak  = $_FILES['uploadPhoto']['tmp_name'];
	$disim    = $_FILES['uploadPhoto']['name'];
	$dtype    = $_FILES['uploadPhoto']['type'];
	$dboyut   = $_FILES['uploadPhoto']['size'];
	$dhedef   = "../../images/katilanlar/vesikalik";

	$kkaynak  = $_FILES['uploadIdentity']['tmp_name'];
	$kisim    = $_FILES['uploadIdentity']['name'];
	$ktype    = $_FILES['uploadIdentity']['type'];
	$kboyut   = $_FILES['uploadIdentity']['size'];
	$khedef   = "../../images/katilanlar/kimlik";

	
	$duzanti  = substr($disim, -4);
	$kuzanti  = substr($kisim, -4);
	$ragelead = substr(md5(uniqid(rand())), 0,5);
	$dyeniadi = 'v'.$ragelead.$duzanti;
	$kyeniadi = 'k'.$ragelead.$kuzanti;
	
	$dyukle   = move_uploaded_file($dkaynak, $dhedef.'/'.$dyeniadi);
	$kyukle   = move_uploaded_file($kkaynak, $khedef.'/'.$kyeniadi);


	$mail = new PHPMailer();
	
	
	$mail_yarismaci = new PHPMailer();
	
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 587;
	$mail->SMTPSecure = 'tls';
	$mail->SMTPAuth = true;
	$mail->Username = "YOUR_EMAIL_HERE";
	$mail->Password = "YOUR_PASSWORD_HERE";
	$mail->addAddress('pelin.celik@ozensanas.com', 'Pelin Çelik');
	$mail->addAddress('turkiyepuzzleyarismasi@gmail.com', 'Türkiye Puzzle');
	$mail->Subject = '12 Saat Puzzle Maratonu';
	$mail->CharSet = 'UTF-8';

	$mail->addAttachment($dhedef.'/'.$dyeniadi);
	$mail->addAttachment($khedef.'/'.$kyeniadi);
	$mail->msgHTML("<div>
					Adı: $name <br>
					Soyad: $surname <br>
					Katılmak İstediği Yer: $place <br>
					E-mail: $email <br>
					Cep Telefonu: $phone <br>
					İl: $city <br>
					</div>");
					
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		
		$mail_yarismaci->isSMTP();
		$mail_yarismaci->Host = 'smtp.gmail.com';
		$mail_yarismaci->Port = 587;
		$mail_yarismaci->SMTPSecure = 'tls';
		$mail_yarismaci->SMTPAuth = true;
		$mail_yarismaci->Username = "YOUR_EMAIL_HERE";
		$mail_yarismaci->Password = "YOUR_PASSWORD_HERE";
		$mail_yarismaci->addAddress($email, $name);
		$mail_yarismaci->Subject = '12 Saat Puzzle Maratonu';
		$mail_yarismaci->CharSet = 'UTF-8';

		$mail_yarismaci->msgHTML("<div> Sevgili $name ,
		<br><br>12 Saat Puzzle Maratonu’na başvurunuz alınmıştır.<br><br>Maratona katılım ücreti 100.- TL (Yüz Türk Lirası)’dır.<br><br>YAPBOZ (Puzzle) Derneği üyelerine katılım ücreti 50.- TL’dir (Elli Türk Lirası)<br><br>Kaydınızın tamamlanması için Katılım ücretini YAPBOZ Derneği’nin aşağıda belirtilen banka hesaplarından birine yatırmanızı rica ederiz.<br><br>KUVEYT TÜRK Katılım Bankası – Karaköy Derneği<br><br>YAPBOZ Derneği<br><br>Hesap no: 95381266<br><br>IBAN: TR73 0020 5000 0953 8126 6000 01<br><br>AKBANK – Galata Şubesi<br><br>YAPBOZ Derneği<br><br>Hesap no: 0148672<br><br>IBAN: TR59 0004 6000 1988 8000 1486 72<br><br>Sevgili yarışmacı adayımız, başvurusunu yapıp Dernek hesabına katılım ücretini yatıran kişinin yarışmacı listesine gireceğini hatırlatırız. Başvurusunu yapıp katılım ücreti ödemeyenler ‘Yarışmacı ‘ olarak adledilmezler ve yarışamazlar.<br><br>Son başvuru günü 24 Nisan 2019 Çarşamba’dır. Ancak 30 kişilik kontenjanın dolması durumunda başvurular daha erken bir tarihte kapatılacaktır.<br><br>28 Nisan 2019’da Deniz Müzesi’nde görüşmek üzere.<br><br>Bizi, Puzzle Derneği facebook sayfamızdan, instagram adresimizden ve <a href='https://takvim.in/tr/'>www.takvim.in</a>’den takip ederek tüm etkinliklerimizden önceden haberdar olabilirsiniz</div>");
	    if (!$mail_yarismaci->send() ) {
		    echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
		    header('Location: http://turkiyepuzzle.com/?status=success&name='.$name.'&surname='.$surname);
		}
	}





	
	
    
    



	
?>