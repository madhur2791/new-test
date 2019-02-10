<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Sound Wave Picture!</title>
</head>

<body>
<h2>Hi {{$user['name']}},</h2>
<br/>
Thank you for registering at SoundWavePic.com!
<br/>
This is just to confirm your registration.
<br/>
Have fun!
<br/>
Your registered email-id is {{$user['email']}} , Please click on the below link to verify your email account
<br/>
<a href="{{url('user/verify', $user->verifyUser->token)}}">Verify Email</a>
</body>

</html>
