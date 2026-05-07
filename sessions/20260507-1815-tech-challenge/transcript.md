# Transcript — 07/05/2026

<!-- Colle ici le transcript de ton enregistrement oral après la session -->
[00:01] okay so to solve this bug the first thing i need to do is to check the
[00:06] the main chess and the test to understand what is the purpose of
[00:13] of this function, this feature. So let's go to session
[00:19] challenge of 7 May. Okay and now I can just execute
[00:24] the main file just to understand what I'm doing with.
[00:29] As I can see in the main file we have contracts and past claims so
[00:36] Each contract have member ID, plan premium and the status. Okay, and past claim. We have each claim.
[00:52] So the purpose of this function is to check the eligibility. So you will just see what is the rule for become eligible to have a claim reimbursement.
[01:08] So the first thing I need to check is the active contract. Okay, so
[01:16] Eligible through Active Contract
[01:19] of M1. Let's see if M1 has
[01:28] one is active okay um
[01:33] is active too and M3
[01:38] M2 as I can see is not eligible because Act not covered.
[01:47] So it should be eligible. Yeah, everything is working fine.
[02:02] test is not passing so this test is failing as i can see um
[02:09] Same act submitted 10 years ago, expected false got true.
[02:14] So let's see the test of this eligibility test.
[02:24] Okay, so what we have is that.
[02:29] We have the best claim.
[02:31] We have the member.
[02:35] So the member claimed
[02:42] And he's requesting
[02:48] 4 out of 10, I think.
[02:55] Same activity thing as cool
[02:57] 10 days ago, same month.
[02:59] and it's not working because
[03:03] We're expecting it to be true.
[03:17] I don't understand, like...
[03:19] This is working now.
[04:27] Expected false and we got true. So this is the bug so
[04:32] In the case where we submitted
[04:36] a claim 10 years ago
[04:38] and we are submitting another client 10 days later, we are still eligible and it should not be working. So let's see the main file.
[04:51] But just before that I will
[04:55] The test is already here so I don't have to write another test, I can just fix this test. So let's see the main.cs file.
[05:05] Okay, I can go to the check eligibility function.
[05:08] And as I can see, I need to spot where
[05:21] So I think the biggest here because
[05:27] implementation of the business logic about the date so
[05:31] I think the bug will be here so I need to understand the code and try to
[05:37] I'm trying to debug this step by step.
[06:20] Okay, so the requestedAct object
[06:27] from the member. So okay, I understand this. And we have to pass the date, so I could return a date object, I think. Yeah, return
[06:45] the latest claim. So I understand this and const hasDuplicator this function will check
[06:54] with the sum function in JavaScript, if claim, so if,
[07:01] Okay, so if it's not the same member ID on the claim and on the request, we'll just throw a false. If the category is not the same, we'll throw false. But I think the bug is right here because right now we have claim date str.
[07:38] this case we have days between so I can just use the days between function
[07:47] to fix that, I think.
[07:56] So we will just erase this because it's not the
[08:02] Is not the right things to do to compare two dates?
[08:05] So I have to request to add dates. So I can just use
[08:14] The date, I think, is in claim.
[08:22] have submitted ads so you have to press submitted ads so I can just use a
[09:17] is less or equal than 30
[09:21] We will turn through.
[09:24] In the other case we will return false.
[09:37] of undefined reading gets time.
[09:48] So that is between function
[09:51] We'll take two data as inputs.
[09:56] Will we turn a date? And the cursed date is already a date. Oh, shit.
[10:07] Okay, and now it should work.
[10:18] So the book was that...
[10:23] object with a string
[10:30] Of course, it will not be possible in TypeScript and JavaScript, so we have to parse the date from the claim that submitted at object and compare the days between the two dates.
[10:45] So it returns the div object, the div variable who is the days between the two dates and I can just return if the date is within 30 days.
[10:59] So to make sure this system works, I need to implement one or two
[11:07] to additional test so that's what I will do. The thing that I like to do is to test the DHKs so like what happen if the test between is exactly 30. It should work but we will try that so let's create a new test.
[11:42] You can just copy these.
[11:48] just change the date so like
[11:58] this and I will just try
[12:03] to divs.console.info
[12:11] just to see if it's exactly 30 days because we don't know what could happen
[12:17] So yeah, 30 days and it passed, so it should be rejected.
[12:42] As we can see the eligibility is not applicable within 30 days. Okay, it should be false, so it's good.
[12:54] This edge case, I think we can test at the
[13:00] other edge case who is 31 days
[13:05] We can just add another one.
[13:56] Oh, I think my test is...
[13:59] The test isn't good.
[14:02] Here is the real test.
[14:05] Let's see, 31 days as we can see it passed so I just need to modify the title of this test and we added two tests to make sure that
[14:16] This edge case is passing every time and not failing. And I think I...
[28:47] step by step I can cover another feature if you want or explain what did I make this choice or everything but just tell me and that's it