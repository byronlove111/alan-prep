# Transcript — 2026-05-29

[00:05] To start really simply, I will just read the brief.
[00:09] in the first time so
[00:13] Let me read the context. At Dr. Lieb, we were working with data analysis who evolve during the time. In this exercise, you will implement a function used by
[00:27] user to track it himself
[00:52] Okay, so I know that I can read the type in the brief, but I prefer reading the type in the TS file because it's more clear for me. So I will read it after. But I see that we have the weight and height of the patient, we have like the BMI categories or the EMC. If the EMC is less or more than a certain amount, you will be obese or normal. I don't know the determining age, but you understand me, I think. And I have to implement a function.
[01:38] analyze patient history, who take measurements as a patient measurement string.
[01:45] array, sorry, and I have to return analysis result as an array, okay.
[01:57] Okay, as I can see I need two data, so I have the weight and the height and I already have this in the patient measurement so I will take it in input so it should be okay.
[02:11] and determine the category. Okay, so I just have to make a basic condition, I think.
[02:22] at which category the
[02:26] they have to be included, so the BMI category, and I have to calculate the variation
[02:38] Purple on a measuring bit.
[02:46] Okay, I didn't understand well the...
[02:50] third point so maybe you can help me to really understand what I need to do because I don't understand like what is the
[03:00] What is like the precedent measure?
[03:08] And what is the variation?
[03:11] So I will ask the AI to understand quickly
[03:18] What I need to do with this
[03:20] So I don't understand
[03:55] I really like to, when I have a task, I really like to understand deeply the context and what is the purpose of this feature, not just to implement and test it, but really understand how the user will use this feature and what it makes to them. So I really like to ask the AI for this because I don't want to ask so many questions to my lead. But I really like to really understand deeply what I 'm working on. So the variation is like the EMC, the evolution of the EMC between two visits. So, okay, I understand. So we need to have the percentage like maybe plus 20%, plus 30%. Okay, so this is good. If...
[04:58] Oh, okay. So the first time we use this, we have to make change percent as null. Okay.
[05:10] Okay, so I really like to using AI like I said because it make example at
[05:16] and it makes so many things really clear for anyone so I like to ask a lot of questions. So as I can see for this patient, we have like January we have heat
[05:29] with and his EMC so it was null at the first time and now we
[05:35] He gained a lot of weight so the EMC Evolved in a bad way so plus 20% okay, and okay, okay? Everything is good for me
[06:23] Okay, so you don't have the right to extend the
[06:30] The tires, I don't have.
[06:33] Okay, I don't have the right to...
[06:35] modify the test function but I can
[06:39] add some function maybe?
[06:43] So now that I understood really well the context and what I will be working on, I like to read the types because it's the thing that I will be working on during the whole exercise. So as we can see, we have the weight and the height and the date, maybe it's like the...
[07:06] the date of the visit.
[07:15] to track if I need to change the percent or not.
[07:20] Okay, so it's really simple. I have a BMI category, so I will
[07:29] some of these inputs into the analysis results.
[07:38] Why is BMI a number? I don't understand.
[07:42] Oh, his BMI number maybe it's like...
[08:09] PMI body mass index, IMC in French.
[08:16] Okay, so it's just the...
[08:20] It's just a field where I will operate the wait and hate for two operations. Okay, now that I read the types, I will read the test.
[08:33] because I think test can really explain a feature
[08:39] before reading the implementation. So as you can see, we are already testing the empty array. We are testing return change percent null for instance measure.
[08:53] So we are already testing if the patient is like the first time for him.
[09:02] It's okay. Product that changed percent positive.
[09:18] Okay, maybe we can add like just this because I think it's missing like we can um
[09:39] We can add a test just to test if the...
[09:45] Change percent is negative if the BMI is less than the last time. So we already tested if the BMI augment.
[10:01] But we didn't test if it decreased, so I think we should test this. I will just like...
[10:16] Those two because it's...
[10:27] Okay, I think it should work after our implementation.
[10:32] So, okay, I cover if it increases, I cover if it decreases.
[13:24] i guess we did one test uh we can also maybe add
[13:41] maybe something missing because we don't have Opus.
[13:51] Maybe we should test if someone is normal.
[14:07] So we can just use like...
[14:22] And the thing that is interesting
[14:25] I need to calculate by myself
[14:30] and EMC who is normal so I think like if
[14:42] this formula. So the weight divided by the height power 2.
[14:54] Okay, so it's like the weight. So the weight is for some of those...
[15:02] I'm going to divide you into two by...
[15:15] Okay, so it's pretty normal I think.
[15:34] We can just choose like...
[15:42] and use the normal, okay.
[15:43] So now we have the test.
[15:45] I did like two tests.
[15:48] Just to, for the first time, understand the data that I'm dealing with and to add some use tests, some match case. So I think it's pretty interesting and I think we should add some more tests after the implementation.
[16:04] So now I have the big picture of the test and I can just implement everything. So if I understood well, the first thing that I need to do is
[16:22] Just before this, I will just read the test again because I need to understand what should I return if something is missing, if something is wrong, because I need to...
[16:35] to think about this before.
[16:40] Okay, and right now I know that I have some edge case to handle before implementing the function, but I like to think about it later after the proof of concept, just to test if the logic is working, and after that we can just go ahead.
[17:03] So the first thing that I need to do is to use the formula to calculate the BMI
[17:13] So I need to take like...
[17:17] The measurement of depression I need to use
[17:20] those two values. So I can use const
[17:25] a const variable named
[17:43] as a number because it's a number
[17:48] So the BMI of the patient is the weight, so measurement
[18:18] I'm going to just use the
[18:22] spread operator function to
[20:56] Oh, it's because it's an array, okay.
[21:30] Okay, so like you said, the array of perfect measurements
[22:28] Okay, so just to make like,
[22:36] could move with the blue.
[23:07] I can just use it to
[23:41] Subtitles by the Amara.org community
[25:15] For each measure, I need to calculate the EMC. So const BMI
[25:22] I'm sorry, I didn't understand that.
[25:24] I need to iterate over
[25:27] through each measure and calculate the BMI for each measure
[25:32] I thought that I needed to calculate the last measure of the last patient measure, so I didn't understand this, but okay.
[25:46] I can just use this.
[26:12] There is so just to understand
[27:10] Okay, you have float.
[28:10] Okay, I just need to understand
[28:21] Subtitles by the Amara.org community
[30:33] Okay, and now I have to...
[31:46] Okay, and now I can just, now that I have the BMI,
[32:01] Now that I have the PMI,
[33:07] just do a simple if and else condition, simple if and else statement. So if BMI is
[33:23] I think it's more equal.
[33:28] We will just start with normal.
[34:25] And the PMI category to type safety is...
[35:01] default is normal and I will reattribute
[36:49] If BMI is less or equal than 25, it's normal.
[37:00] less than 30 it's surpoids and if it's more or equal to 30 it's
[37:40] Make everything inside a try catch function, I think.
[38:11] The next step is to calculate the percentage
[38:17] Between the last...
[38:20] Measurements. Okay.
[38:47] I think I can transform my for loop
[38:51] to use the index and a number who can iterate over the array because with const measurement of measurements we don't have the control
[39:07] this to make a clean code
[39:15] I don't know how can I make something more
[39:19] I will go with this solution for now.
[39:37] is less than or equal than
[40:02] measurements.length
[41:13] I can create a new variable named
[41:22] with equal to measurements
[41:52] Okay, and I can just swoop.
[42:17] And to calculate the last measurement
[43:02] Okay, so the formula is
[43:53] I think my solution right now is too complex because I want to do two things at the same time using the same loop. So I will increase the complexity a lot but I will do another loop. So I can just erase this. I can just go back, go back and go back.
[44:33] Okay, and now I can push...
[44:44] analysis results that push
[44:49] So what is the type? The type is...
[44:53] and this result is like this
[44:58] Okay, I will just go like this.
[45:01] David is a cool too
[45:07] Date is equal to measurement of date, I think.
[45:23] percent is equal to null at this time
[45:27] So now we just need to calculate the
[47:05] So like this we have
[47:14] the case we can use
[50:21] And we have short power.
[50:27] see but I think everything is incorrect
[52:37] Okay, so now the PMI is...
[52:40] less than 25 so it's good
[52:44] it's more than 25 so it should be working so
[52:48] This loop is correct.
[53:12] Everything is working too, so I don't understand. Let me see.
[53:34] i think like it's analysis
[54:38] okay we don't want uh
[57:29] and well fermented.
[57:46] Is it like the thing that we wanted?
[58:02] 27 and 26 so yeah i think it's good
[59:05] okay we received a normal one
[59:15] I think I missed something.
[59:24] Okay, and now we have a last erode chain.
[59:49] why the change percent is not working here