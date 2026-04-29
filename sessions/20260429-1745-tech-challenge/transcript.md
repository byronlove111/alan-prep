# Transcript — 29/04/2026

[00:01] Okay, so let's begin the exercise.  
[00:07] So the first thing I do is to really understand what he is asking to me. So right now I can see here that we have an ordinance. I don't know how we say it in English but...  
[00:22] We have an ordinance and the thing we have to do, I think, this program is, the purpose of this program is to, I think, purse it and  
[00:35] It's by the prescription and mapping everything into object for our codebase  
[00:40] So let me run the test just to understand what we're dealing with.  
[01:10] What is the command to run the test? Okay.  
[01:26] From the test I see that everything is working fine but  
[01:31] I have to inspect if everything is really working fine.  
[01:53] But everything is working fine I think right now.  
[02:11] I don't see any bugs.  
[02:16] Yeah, remove space. Put them in the prescription I just looked.  
[02:39] So in the main.cs... Okay, in the main.cs I have two prescriptions.  
[02:45] But my test when I run, when I execute the main code, show me that I have just one act. So it removed the second act and I think I can implement a new test in testrunner just to show that we have this problem.  
[03:53] So right now what I'm  
[04:00] I've seen a bug and my first reflex is to create a test that shows that we have a bug. So when I will run the test, it will show us that this test don't pass and it should pass. So we have a bug and we have to inspect the code to understand where the bug is and fix it. So let me run the test and...  
[04:23] First Monday on the act, expected 2, we got 1.  
[04:27] So we have a bug and our job is to fix it and finally pass this test that I implemented right now. So  
[04:37] So the bug is when we have more than one act. So let me see the code.  
[04:47] So we use browse prescription, okay.  
[04:50] So, plus is our main function in the file, the only function that is exported, so we can just  
[05:00] So we take input, I will just  
[05:03] I like to do this, I will just  
[05:07] right here because I  
[05:11] this in front of me when I'm working  
[05:14] Okay, this is more clear. So, row string is equal to this right now.  
[05:26] Let me see what we have.  
[05:32] Okay, so I'm logging lines to understand what the parsing is in the first time of the function.  
[05:45] Okay, so we have this one  
[05:53] So right now we still have the two acts.  
[06:01] It's all right now it's okay  
[06:09] The problem must be here.  
[06:11] So what we are doing is to  
[06:14] we are using slice function so I'm not confident with slice so I will just ask the AI to explain to me how we use slice and what is the prototype of slice so what is slice and  
[06:46] So, I need to understand slice, and I will dig into the function to understand if we have a problem here.  
[06:54] So, slice, extract a portion of an array without modifying the original.  
[07:01] it take an array input so right now the array is i clients i will just log  
[07:09] lanes just to understand the theory.  
[07:11] is working fine here  
[07:18] Okay, so now we have the two acts and  
[07:24] It takes the first element of the array  
[07:31] is the beginning so it's okay. Act line  
[07:42] If everything is working fine, okay.  
[07:50] 0 and 1 so it should work fine and we use the parseAct function so the parseAct function must be where the bug is  
[08:05] to understand the function and what it takes in inputs.  
[08:14] we can see that we lose the second axis.  
[08:39] Okay, I don't understand why...  
[08:43] why the minus one was the problem, I just removed it to  
[08:47] if it was a problem  
[08:58] is slicing between 0 and 1.  
[09:08] is the second element of the array, it will be sliced, so we need to  
[09:13] take an extra place further away I think with the slice function so yeah like  
[09:22] So 1, 2, 3 and the 3 is sliced.  
[09:25] So, okay, so if we wanted to have an array with bcd, we will use slice with 1 and 4. And right now we use slice with 0 and 2 to make sure that the last  
[09:39] The last element is not sliced.  
[09:46] The test is great and now the test pass. So I think I resolved the test.  
[09:52] Tell me if I missed something.  
[09:55] But the test is implemented and I think I can just add another test to make sure  
[10:17] we have a test with  
[10:19] We don't have any act.  
[10:30] Right now I want to test  
[10:31] if I don't pass any act into the function  
[10:53] Okay, so right now I can just do that.  
[11:57] So yeah, that's it. I think I finished. So to summarize what I did, my first step was to understand what we deal with data and what was the project  
[12:09] function, you know, like really understand the project and why we need to do this. After that I take a look to the documents, to understand the documents. I run the test and I run the main function just to see what it does. So I saw that it passed everything and when I run the test I see that everything is working fine.  
[12:31] But with the main function, I saw that when we have two acts, it becomes buggy. So I implemented a new test.  
[12:41] I fixed the code and showed that the test before and after my code was not passing and after that it was passing. So that's it.  
[00:01] Okay, and to continue, this is the second transcript.
[00:06] because I forgot to
[00:08] to check for the case where the professor is not a doctor so we have to
[00:14] take it in input with the sample so
[00:21] So to test this, I will try to replace Doctor by Professor.
[00:32] Okay, and just run the test.
[00:44] Okay, we still have the log. I have to... In the first time, I will remove the logs that I had.
[01:24] Everything is working fine
[01:46] Okay, parse his doctor name correctly. Expected Leclerc Antoine got Metsin. Professor Leclerc Antoine.
[01:53] So the test is not working here and I need to
[02:00] to modify the test in a
[02:05] in the first place, so press his doctor name correctly
[04:33] Okay, so now I can just
[04:38] So I implemented the test
[04:44] Professor was not handled by the code.
[04:50] And now my mission is to just tell the program
[04:53] If it's a professor...
[04:56] take it as professor, if it's a doctor, take it as doctor.
[06:10] I think I request another function.
[06:13] just to make sure that if we
[06:20] Okay, so my first I will boot for this note. This will not be a clean code my first I
[06:27] out is to just make a if condition if lines.to includes
[06:40] We replace it with the doctor.
[07:39] Okay, so now I can run the test.
[08:12] because I define it in an if with mail
[08:25] If I do this, it will work, maybe? Okay.
[08:31] Okay, so my if condition is not working.
[08:36] So you need to understand why.
[09:14] okay so line two we have this
[09:34] the LC function that was
[09:38] Okay, so length is true. So
[09:48] Okay, it includes PR, so I don't understand the program here.
[10:10] What is the problem? Ah, okay, sorry.
[10:34] passes correctly so I think I finished
[10:42] And I think if I had to refactor the code, I will do...
[11:12] And I think I will move
[11:15] Everything inside this.
[11:19] say let doctor equals
[11:23] assign doctor name and pass it line 2
[11:28] I will move everything inside the function so
[11:55] statements, switch statements
[12:00] I think it's more readable.
[14:48] Expected Leclerc Antoine got medicine
[15:40] And everything is working fine so I think I finished the exercise.