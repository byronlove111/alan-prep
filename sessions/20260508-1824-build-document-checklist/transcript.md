# Session Transcript — Member Onboarding · Document Checklist

<!-- Session notes and observations go here -->
[00:02] Okay, so the first thing I need to do is to read the brief to understand the project that I'm working on.
[00:11] Feature brief, member-embracing document checklist, estimated time one hour, new voice.
[00:17] Okay, so for the context,
[00:20] Before activating the contract of an adherent, ALAN verify that all the documents required
[00:30] According to the plan subscribed, the list of parts. Exaggerated.
[02:06] understand the purpose of what I'm building I need to just check them
[02:13] the test so you will execute the test just to see if everything is passing if someone had implemented the test for the test driven development so i will just see just in case
[02:44] Okay, so this is not working.
[02:50] We will see why and just let me try to run the other test and this one is not passing too. Okay, find member, find existing member by ID. Okay, so let's see if the test have a problem because we can 't error if the test are not working.
[03:21] Test is not defined at the line 19 of the MER test.
[03:26] Test is not defined.
[03:31] Why do he say that?
[04:03] Okay, so I need to...
[04:04] I need to run test run, okay.
[04:24] I think I need to code everything in checklist.js. Maybe the brief will tell me if I need to create the file.
[04:35] I just need to create this file.
[04:36] Okay, let's see, create new file.
[04:48] Checklist.js. Okay. Let's...
[04:55] Do we have like the...
[04:58] the type already defined in the file type.js. I think so, maybe the roof will tell me if I need to implement them or not.
[05:07] Code base existent share déjà
[05:12] Okay, so I need to create this function. I can just copy paste this function, this prototype of the function into
[05:28] just import everything so I will just copy this thing
[05:49] all the typo needs I can just
[05:52] to see if everything is working or not.
[05:59] just to see in case if we missed something
[06:04] So I will just run npsgs6 checklist.json
[06:14] You're hiding the call.
[06:15] it will not working.
[06:18] and let's execute the function just to see
[06:23] Let me see if it's working. Okay, it's working great. Okay, so now, what do we need to implement?
[06:49] So if I read closely the brief.md, I see that I need to create a function named generateActivationReport that takes as an input member ID, a list of members, a list of contracts, and a list of documents.
[07:05] So the first thing I need to do is to
[07:07] Look through every member, I think.
[07:21] Okay, so let's see the type.
[07:25] Let's see the type of the member. So, in contract we have pending activation.
[07:32] So this is the value that we need to read to know if a member is in pending or not. So it's contract and it's relied by
[07:45] the member ID so I can just loop through every member or every contract and
[07:54] and see which member needs to activate his contract.
[08:00] So I can just use this to see that. I will again read the brief.md.
[08:54] Okay, the function just take okay. I already have the member ID. I need to check okay, I Didn't
[09:04] I didn't see that. Let me check.
[09:25] Okay, so the first thing I need to do is to check the contract of this member so I can just create the contract, so const contract.
[09:35] contract is equal to
[09:39] that find contracts
[10:17] I'd like to see if...
[10:20] If this method is working in JavaScript, so the logic is to find the contract in the contract list with the same member ID that we had in the input. So let's see. I like to create a test on myself on the main function to test everything before the real test.
[10:54] make something like this and use it like that
[11:12] activation report with member ID I can use like
[11:27] as an input, I can use contracts as an input and I can use documents. I don't think we have documents in the checklist test, I will see. Let's see if we have documents. Yeah, we have documents. Okay, let's see.
[11:49] I just want to know if I found the right contract.
[11:54] So it should print this line.
[12:02] So we have the right contract and now we can just see
[12:15] pending activation.
[12:22] else we can just return none
[14:01] Okay, now I have my if-and-else condition.
[14:12] This thing, we need to check a lot of things, so let's read again the brief.md. So...
[14:40] which document I need to send. Okay, activation report.
[14:47] I need to implement the logic by myself or not?
[15:08] Let's see what do we have in the other file. Okay, we have get required documents.
[15:19] Now we have recreated documents, so... recreate documents...
[15:28] Okay, I already have a function in getRecurriedDocument, so I will use that.
[15:36] Oh, I have a findMember function, I didn't know that. Let me use this.
[15:53] Let me send members.
[15:56] and a member ID I think, let me check, okay.
[16:00] So it should be to remember...
[16:08] That was a faint contract that I had not seen to use.
[16:18] It's more clear, more clean, more scalable so I will just use that.
[16:25] So we have a single responsibility.
[16:33] So now I need to check if the documents are valid.
[16:39] So I will just use the function
[16:42] I also have a expanding activation control.
[16:59] So I can just send contracts. Okay.
[17:11] I can just get required documents.
[17:17] okay i can use another um
[17:21] another if and else function
[17:29] I need to send to the function. Let me check. Okay, we have get occurred documents. And we need to send a plan. So plan type. So what is plan type? Let me see the type.
[17:48] BasicPrim or Premium.
[17:52] Okay, and where do I have to place it?
[17:55] I don't understand the video
[17:57] How can I use this function?
[18:03] Okay, I need to send the plan of my member to get the required documents. Okay
[18:09] So I think in the type we have yet
[18:12] In each contract we have blend type.
[18:15] Okay, so I can just send in the checklist.
[18:29] before we make the if and else function I will just check the document so write is the
[18:36] Let me see the written type of get-required documents. I think I need to import get-required documents.
[18:45] We create documents from utils.
[18:50] The export type is a list of document type.
[19:16] This is an array of document type.
[19:33] just to understand if I am missing something.
[20:12] Make sure I'm not missing something.
[20:16] Okay, so now I have all the documents that are required and what should I do with each document?
[20:36] Now I need to check if every document is sent by my member.
[20:42] So you're the key man in the safe, the key man in the status.
[20:49] Okay, I need to check if in the...
[21:33] Okay, now I can just look inside every document.
[21:39] so you can just const
[21:43] of required documents.
[23:47] Okay, so now I can just look through
[24:00] I can just loop through each required document
[24:07] if we sent this well into our document.
[24:10] Document will have a document type
[24:17] So document type can be identity. So let's just see.
[24:28] Is it in contract or is it in member documents?
[24:32] Okay, it's in member documents
[25:11] We want document.idot.
[25:34] just console.log this thing because it makes a lot of code and I don't want to lose track on the code. So let's just see if it works.
[25:48] Is painting activation is not activated maybe I just forgot to include this function Let me see
[25:57] spinning activation should be
[26:07] pending activation from contracts okay and now it should work let me see uh okay i cannot read properties of undefined finds uh what do we have undefined
[27:06] Okay, let me just use that because here I'll...
[27:11] This one is a bit difficult to understand.
[27:18] What is the problem?
[29:20] I just want to log member documents.
[29:30] Okay, so now this member document is undefined.
[29:39] just erase this because I think this is really bad
[29:45] Let me refactor my code because it got a little bit messy.
[30:31] Okay, let me just log
[30:43] Okay, I need to check if identity and rib are well sent in my member documents.
[31:04] Oh, I can just do if.
[31:41] Remember document array.
[32:08] I think I'm missing something here.
[32:17] I just have the identity document type in my member.
[32:21] So the other is not sent. Okay, so now for the first thing I need to check if the identity is well sent.
[32:34] How can I do that? Okay, I need to...
[32:53] I think I can just use a find function. I don't know.
[33:09] constant memory doc it equals to
[34:11] Let's see if it's working on us.
[34:14] Okay, this is not working and I need to understand why. So I...
[34:40] are talking. I think this should be working. Okay.
[34:45] So now I have this find, so it found the right document.
[34:53] So now I can just see if
[35:10] Let me see brief.md.
[35:17] okay now i can just create a new variables named
[35:24] Missing documents, okay.
[35:58] Okay, and now I have my report variable that will contain every document, every missing document, the exhibition report type. So I can just push into this document. I can just push like...
[37:01] Okay, I can't push into the...
[37:21] Missing documents and we are missing rib, okay.
[37:26] Okay, so this is working.
[37:41] If I should, and if I do this,
[37:47] Okay, it erased the previous one, so I just need to understand the syntax well.
[37:54] So if I go to checklist
[38:04] So missing documents is an error, right?
[38:09] document type of array.
[38:10] So I can just push, I think I can push the required type.
[38:17] How can they do that?
[38:34] I don't understand why
[38:39] This is not working.
[38:48] Is it because like we didn't create it before? Maybe?
[38:58] Maybe I should just create everything before
[39:02] before pushing something.
[39:26] about that missing document to query type right now.
[39:33] expected at line 13 uh i think i made the typo because
[39:41] It took me an iterative comma
[39:54] can use equal at the line 15 let me check
[40:00] Oh yeah, because I'm an inept object, so I can't...
[40:03] I should use this syntax.
[40:08] Yeah, this is the right syntax, okay.
[40:16] okay so the rib is pushed in missing documents and if i also comment identity
[40:27] identity and view are pushed well into the missing document object. So I
[40:39] So now let me So now we have a loop that push every missing document into the array of missing documents into my object report So it's working well now
[40:54] So missing documents is great.
[40:56] Again, I need to check if the document is sent but he is
[41:03] He is rejected on us.
[41:22] rejected, I need to push report.
[41:27] Rejected documents...
[41:49] Okay, so now I can just...
[41:54] So let's try. So now it should
[41:58] do this, okay, everything is great
[42:02] So we have the missing documents and the rejected documents. And now I should read the brief just to understand.
[42:13] So missing is done, rejected is done, pending and received are...
[42:23] So what is the checklist? I didn't understand the checklist.
[42:54] Okay, let me see what did I missed.
[43:20] report variable because we already have some information like we have the member ID so I can just like
[43:34] ID is number ID, contracts ID
[43:42] Maybe you can just...
[43:57] because we checked the null, so let's just not create a variable if there is no contract. So contractId is contract.contractId
[44:11] Plan? What is the plan?
[44:17] container, I don't understand.
[45:19] Activation status will be defined at the end plan. I don't know how to define plan
[45:28] We should receive it before, I think it's in the member.
[45:33] It's in the contract, okay.
[45:37] so you can just use
[45:44] I know it's working.
[45:46] Okay, and I just need to populate the activation status if the missing documents, the rejected documents are already be handled and I need to handle the checklist and the activation status. Okay.
[46:08] So for the checklist I need to understand what they want from me
[46:19] Check the type of the checklist just to understand checklist document check results
[47:35] We need to check the type.
[48:08] if it's required or not.
[48:48] Okay, should we work right now?
[48:51] I can just do the same here.
[50:18] Okay, and now I can maybe just console.log everything.
[50:27] I can log the region.
[50:34] okay i have an exception let me see
[50:41] My function became pretty big so I will need to refactor
[50:45] maybe later but this is just
[50:56] this typo quite a bit but it's okay and now i have
[51:07] console.log so should work.
[51:09] Now you have the object with everything inside it.
[51:13] And every checklist is true.
[51:20] Just let me see if...
[51:23] missing document is well typed
[51:28] Okay, yeah, it's just a, okay. So everything is working great.
[51:36] I just need to know...
[51:40] like the documents who were not required.
[52:09] Okay, I think I finished because I just need right now to create the activation status.
[52:16] are really incomplete or blocked.
[52:27] if one document is missing or pending. Okay, so now I can just
[52:55] I can just use the if and...
[52:57] elephant as function statement
[53:28] Okay, so at the first we need to
[53:31] In the first time we need to create for the blocked status. So if report.
[54:01] We can use length, I think.
[54:08] is equal to zero and we post report that
[54:13] activationStatues will equals to blocked
[54:25] missing documents.length
[56:12] And I just need to forward the first two.
[56:14] to finish I just need to know if uh
[56:23] that is pending so I just need to implement this
[56:27] Cough, cough, cough.
[56:29] I just need to check the first checklist, document check result and status. Okay.
[56:41] the type of document check result
[56:47] status it equals to
[56:57] report.activationStatues equals to incomplete
[57:07] activation statues.
[57:13] And I think I finished, so now I can just return reports.
[57:21] Okay, a lot of work, but I think we finished this.
[57:34] Okay, let me check.
[57:39] Okay, so now we have this and we have the activation status that is blocked
[57:45] I will just try if...
[57:50] like this is pending
[58:03] Sorry, I just have to...
[58:05] Let's try with this case.
[58:11] complete because it's pending okay so it's working
[58:16] no documents is inside the missing and rejected okay so now um that i finished the feature i will implement test and i know i need to refactor some a lot of things because like we um
[58:33] We loop through the whole array a lot of time, we loop through this using find, we loop another time using another find, so I know that I can mix the two of them inside one function and just clean up the code, but it's not the purpose of this meeting I think, so I will just stay with this solution and implement new tests just to see if everything is working great.
[59:04] Let me just remove all the
[59:14] Okay, and now I just want to...
[59:18] I just want to try the existing test just to see if everything is working like expected.
[59:34] So let's use testrunner.
[59:46] everything is working but I will implement new test just
[59:50] Let's remove the log and everything.
[60:10] Okay, so for the checklist, let me read every test
[60:20] incomplete missing duck, incomplete pinging duck
[60:36] missing document only contain actually missing docs.
[61:14] create new ideas for testing the code because I don't have ideas and I find that the
[61:20] the existing test file contains a lot of tests like we have 130 lines so it's a lot of tests so I'm just using AI to create ideas of what can I
[61:33] Can I test in addition? So let's see.
[61:45] Okay, let's see with the premium plus so the premium plus should
[61:51] Let me check type. Premium Plus.
[61:56] I think it's in the user's function. Yeah. Premium plus will need
[62:01] all of this, so let me implement tests for this.
[62:06] So checklist.test, I will just copy and paste the tests.
[62:27] So we have member documents.
[62:30] And I need to create...
[62:35] new type of contracts. Okay, we already have a contract, so it's great.
[62:47] this person who is on the premium
[63:25] So we have pending activation.
[63:28] We have two documents, so this test should fail.
[63:41] Expecting to be per...
[64:07] expectReport to be like
[64:23] activation status to be incomplete. So let's see if it's working.
[64:57] Okay, so let's test this.
[65:01] Yeah, it should work. I think my test is already written. I just need to erase the...
[65:10] the title of the test and create a new so
[65:19] How do the past developer wrote the test to be consistent with the methodology of writing tests like us?
[65:28] Missing documents does not include... Okay, so premium plan
[66:06] Okay, so this test is...
[66:11] is passing so it's great and now i will test with everything inside it
[66:35] So what is the file that we need?
[66:50] just copy and paste this
[67:17] Let me see if it should be active. The status should be ready.
[134:56] and let's see if everything is passing and everything is working great so I finally implemented everything and test the code case so that's it