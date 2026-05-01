# Transcript — 01/05/2026

[00:00] Okay, so the transcript of the conversation was not working in the few 20 minutes, but I will summarize what I did. So the first thing I made is to really understand the concept. So I read the data and read the brief and check the test. So I run the test just to make sure that they're failing and what is the message and I found out that the
[00:35] the test we are not compiling.
[00:37] So I create a renewal.ts file in the ssrc folder and
[00:45] and the tests were not passing but they compiled after this. So at first I created the check renewal function and typesaved the arguments and understand the data structures I'm dealing with so I checked the type.ts file and read all of the types in this file.
[01:13] And after this I really understood what
[01:18] what was the data that I had in input of this function. So I read the utils.ts2 because I knew that I will need to create a function
[01:31] comparison between two dates.
[01:34] So I found out that in utils.ts there is a function named daysBetween who
[01:44] who can be useful in my program, in my algorithm,
[01:50] Right now what I'm doing is that I imported all of the sample data, so members and contracts and reference date, just to compile just my file and when my file will working I will go to the
[02:08] to the real test but I think it's more easy for me to work like this.
[02:14] But maybe I can just use the VS Code debugger, but I like to do it
[02:19] to do this like this.
[02:30] So I found out that I need to
[02:44] I found out that I need to really
[02:48] really look through each member, each contract to compile because I need to return a list of renewal notice and not just a renewal notice.
[02:59] So maybe I can just create a new function like...
[03:40] Okay, so now I can...
[03:46] used a Czech renewal
[03:50] Maybe it's a duplication code but I think it's more clear to beat force ds and make just like my ideas not be messy with the code.
[04:05] so I can like, renewal list.push
[04:10] Check when you all...
[04:11] and take as an argument a contract that
[04:33] I think right now I need to use
[04:36] and index, so let e equal 0
[04:52] So I have like the same number of contract as the number of list, I think.
[04:59] Let me check in the sample. So I have like four members and one, two, three, four contracts.
[05:07] but I think a user can have a lot of contracts, so I need to...
[05:14] So I think it will be more precise if I look through contracts and not remember
[05:23] So I'm going to loop through contracts.
[05:29] List contract.size.addedLength
[05:36] This is a function. Not sure.
[05:53] So, check renewals list member
[06:10] I'm just gonna erase everything because I don't need to make another function. I think it's great like this.
[06:30] So I looked through every contract and I'm just gonna
[07:05] So just to make sure like in renewal notice object we're going to push every member except
[07:14] active and remember that already expired.
[07:28] I have a function in the exactive status, so I'm just going to use that.
[08:13] Contract already expired.
[08:18] Do I have a function for using this?
[08:25] Yeah, I can use these between.
[09:06] What is the output?
[09:13] okay i'm just gonna load it out but
[09:21] the output of the days between the functions
[09:25] because I want to make sure I understand the output of this function.
[09:31] uh... so you can't get into some pilot program
[09:38] if activeStatues is not defined. I think I didn't imported the function.
[09:51] A little bit of pressure.
[09:57] Get time with another function in the utils.js
[10:05] Really strange because it's not in my file so...
[10:13] I think I passed two dates in the...
[10:23] Wait, wait, wait.
[10:27] Today is date. We think date is date.
[10:50] I think we forgot to import a function.
[11:17] Very strange, very strange.
[13:28] that is not defying my interest
[14:53] Okay, so I need to make sure
[16:10] So now I need to make sure
[16:27] We continue. We just continue.
[16:48] is less or equal than
[18:03] I have to not forget that
[18:16] I think I made a mistake.
[18:31] Okay, just like a...
[18:33] We're dealing with negative numbers, so we need to make sure the if statement is comparing
[18:44] superior and not most and not less so renewal
[18:53] urgency is equals to okay.
[19:01] console I'm just gonna look at the renewal object right now just to make sure everything is working fine when you
[19:44] The date is more than 0, so one year later it's just not be taken in the function.
[19:57] So a 7 is critical raining and okay, it's okay. Everything is working fine for this So we have the object, okay
[20:11] And then if I just look,
[20:15] We knew all we just have this
[20:17] Okay, so now that I have this I
[20:28] Each renewal into the renewal list.
[22:41] Okay, so I can just do this.
[24:50] this so I can just bring your list
[25:08] This will work fine.
[25:43] Let urgency have to be let because I modify this variable.
[25:50] And I can type it safe, type it safe like her.
[26:04] Find member, take two arguments.
[27:00] I think everything is working fine now.
[27:07] the result of this function
[27:17] And I have an array of objects.
[27:21] with the summary and the days until expiration and the urgency of renewing them.
[27:33] So I can just try to pass the test.
[27:37] And everything is working fine. So I'm just gonna add new tests into the test file and just
[27:51] I think it's clear.
[28:20] Okay, so the first thing I have to test is like every
[28:33] perfectly, minus 14, minus 14.8, minus 30.
[28:40] So I'm just gonna create new test
[28:52] So seven days already covered and they will add
[29:13] Okay, maybe I can just do something like this.
[29:48] And it should be in running.
[31:29] I think it should be...
[31:36] Just pressing there.
[31:46] My test is not working. CTR 06.
[32:23] Why is my last test undefined? I don't understand.
[32:27] Why is there just three?
[32:36] Active but over new. True, maybe.
[33:10] Okay, so now I have the six.
[33:30] 30 and this is running with
[33:41] I made something like this.
[33:46] will be okay I think. Yep.
[34:02] So this test is passing.
[34:08] Let's create another test.
[35:05] So it's critical, so yeah, so I can find...
[35:45] We'll just make a...
[36:05] so i'm gonna last i'm gonna add the last member to check the
[36:09] the last case of 30 days
[36:13] expect it to be okay and not running
[36:23] and make this with bus.
[36:25] And everything is working fine.
[36:34] So I think I finished.