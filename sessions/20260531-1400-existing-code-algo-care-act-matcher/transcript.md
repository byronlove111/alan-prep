# Transcript — 2026-05-31

[00:01] Okay, so let's start the interview.
[00:07] So the first thing I need to do is to
[00:10] with the brief just to understand
[00:12] the big picture of the problem. So for a minute let me just read the brief and I will talk later about what I will do to solve this problem.
[01:14] Okay, so if I understand well, I will have two data files as an input. I will have the axe.json, who will contain the canonical form of the aliases, so this is my source of truth, and I will have the sample inputs
[01:35] not a typo but that are not readable for the program at this time at this moment so as i can see in my data file i have consultation general
[01:50] handled by our program but concert, séance kiné, analyse sanguine... okay so we have like problem with aliases with
[02:02] underscore and score, I don't know the word, and when a word have maybe too much spaces between two words.
[02:12] So maybe we will need to trim that but it's just a hypothesis. Let me just read the test. So right now I'm reading the test before reading the main code because I think that a test file will really explain a lot about how the system works. So let me see the test.
[02:32] So as I can see we have two test files.
[02:36] The first is existing behavior.
[02:39] So let me run the test just to see if
[02:43] Those tests are working right now.
[02:47] Let's go to session.
[02:53] Okay, and now I can just type
[02:58] And right now as I can see
[03:02] targetChangeTest.ts is not working, so a lot of things are missing.
[03:08] and existing behavior
[03:13] If I'm reading existing behavior, I know that this is handled by the program.
[03:22] So we have the data from load care acts function.
[03:27] So it's just a function that read the file
[03:30] Let me see the file again, hack.json, okay we have the hack.json
[03:37] Consul GP and the label Consultation Générale
[03:41] and we have an array of aliases
[03:45] who contain the aliases that we want to take an input and handle.
[03:51] So maybe our goal is to...
[03:56] be perfectly typed as the aliases to be taken in the program.
[04:05] So for consultation générale, this is working.
[04:09] For radiology, this is working, but
[04:11] For the next test, consult this is not working, science kinetics is not working, analysis song is not working, and priestess song is not working.
[04:21] So if I go back to hack.json, I can see that
[04:25] uh... analysis sanguine
[04:36] uh, clinical trial.
[04:45] need to map the label or the aliases.
[04:50] So now that I understood the input and the output of the program,
[04:55] So I think that JSON is the output of the program, but I will see with the type.
[05:01] So in the type we just have care act,
[05:03] with the code and the aliases so it represents the hack.json so I'm pretty sure that we output a file
[05:21] Okay, let me see the test.
[05:26] Okay, just output the string so it's pretty easy Okay
[05:34] So if I read the type we just have a care act so care act is used as an input in the function so I think like
[05:41] Resolve Act code take as an input the
[05:46] the incorrect typed
[05:49] and Act is like the source of choice and we will need to compare.
[05:53] Okay, no problem with that. And let me see the utils function, just to see what can I use on my program to be really efficient and not duplicate some code.
[06:06] So we have a normalized loose text function
[06:10] that will trim everything, lowercase everything
[06:15] I can use like this to split. Okay, so to separate
[06:20] to clean every underscore, every slash and make it
[06:26] as a space. So really, it's really powerful. This function should be used in the main program.
[06:33] This function is just for the test and readline is just for the test. I think here readline is... yeah. So we have this function who is really important for us.
[06:43] And we will need to use it in the ActMature.ts.
[06:49] before going to implement everything I will just
[06:57] like a lot of tests but
[07:01] I want to create a new test
[07:04] because I think it's important to test the edge case too. So I will just implement them because it will change the way that I will implement the function.
[07:19] Okay, and now I can just...
[07:25] I can just erase that test.
[07:34] Like maybe if the...
[07:40] if the input is empty. So like if we...
[07:44] If we send to act mature null input,
[07:49] string that is empty we should return a null
[08:18] I can just use AI to generate those tests for me. So I will ask it using just
[08:45] What is the name of...
[09:00] empty string, so we already covered the empty string case.
[09:19] to see if we will have a performance problem.
[09:24] So we have the empty test, we have the giant array, so the limits of the input,
[09:52] And I think it's pretty great.
[10:15] I use and I love to
[10:21] I like to ask AI to use a pattern that I know
[10:27] because I know that arcs, arrange, assert are really clean code pattern and if I input AI with those words in my prompt, it will output
[10:40] a better outfit so um
[10:43] I like to really specify how I like my test to be.
[10:49] So now we're just watching AI consulting every
[10:54] every test and think about what it should implement. During that, I can talk about
[11:02] After the test, I will implement the correct solution. So we can see the AI
[11:11] Let me see what it just creates.
[11:16] Additional edge case, okay, that's great.
[11:19] We will see what is it. Okay, and we have to
[11:32] this is great so let me see
[11:38] Let me see what it just outputs.
[11:42] We have a test for return null when the actor is empty. So this is great.
[11:50] Find a knight in a very large arc's way. So, create a size of 1000.
[12:03] Not very important.
[12:10] I think this test is really... it's really great because it tests if our algorithm works with a lot of acts and I think it can be really used
[12:25] really useful in the future. We don't know for a non-existent act when the act array is large.
[12:36] It's just too much work. So let me just come in this. We will go back to this later after the implementation.
[12:43] So if I go to Archimedes
[12:47] I see that it's not using actually the normalized lossy text that we see in the uchis.js. So I think that the first things we need to do is
[13:04] so const trim, I will create just a variable to stack this
[13:21] So now we should have the input that is trimmed and it can be like a
[13:33] to name my variable.
[13:42] I can see that this for loop is just looping over the acts label and not over the aliases. So, the things we can do is just for acts of acts
[14:18] equals to
[15:06] Okay, so the condition that I
[15:10] that I think is great is just like
[15:14] In the first time we will compare the label
[15:18] And we also want to compare if the aliases
[15:23] one of the aliases match the past input.
[15:30] I think we need to...
[15:33] To lowercase everything?
[15:48] I think, let me just read actor Jason, but...
[15:53] I think we should...
[15:57] Yeah, I think we should make everything
[16:02] Anything lowercase.
[16:04] So, first input, I think first input is already in the lower case. Okay, so this is great.
[16:10] And so if we find something, we just return the actual code.
[16:18] So this should work. Let me see the test.
[16:26] Okay, this is not working, we have some
[16:41] Okay, so which tests don't work?
[16:44] Let me see target change test existing behavior is still working.
[16:49] I didn't broke something.
[16:55] This test was physio
[16:57] Physiot line 15 is not working. Okay.
[17:02] So this test is not working and let me see why so
[17:12] I think my condition is...
[17:18] So let me just see if I do this.
[17:25] Okay, if I do this, is it working?
[17:31] Okay, this is working
[17:55] I will just select the person just to understand what is the output of normalized logistics. So we have
[18:04] like, SeanceKinney, with the output, and let me see, um...
[18:11] If I console.log, I will console.log just the aliases just to understand because this is
[18:39] this thing so let me just see okay
[18:47] We have sounds kiné.
[18:50] who is not matching with Sans Duc.
[18:55] So maybe a thing that we can add is
[19:00] take every word of the input
[19:05] make like a score if
[19:09] if like this world includes
[19:14] about this word, maybe it should like
[19:17] gain a lot of score points and rank them
[19:21] Like, associated to...
[19:27] I don't know if my solution is great
[19:32] But I will go with this one because it's my first idea and I don't understand what else I can do to
[21:22] Okay, so the problem is that I have an 8-8.
[21:25] have any idea of how can I fix this problem but I think I can create
[25:57] Okay so I will just create a new for loop into the main for loop function.
[26:05] So I will loop through each alias and see
[26:09] see if first input it equal equals to alias to lowercase
[26:31] and now this is working okay so it just needed to like compare every
[26:39] Every alias and this is working.
[26:43] So I finalized the exercise so tell me what you think
