const missions = [

{
title: "The Missing Quote",
difficulty: "⭐",
code: `print(Hello World)`,
solution: `print("Hello World")`,
hint1: "Python needs text to be marked as a string.",
hint2: "Look at the words inside the print statement.",
hint3: "Try adding quotation marks."
},


{
title: "The Invisible Variable",
difficulty: "⭐",
code: `name = "Alex"

print(Name)`,
solution: `name = "Alex"

print(name)`,
hint1: "Python is case-sensitive.",
hint2: "Are both variable names exactly the same?",
hint3: "Change Name to name."
},


{
title: "The Number Trap",
difficulty: "⭐⭐",
code: `age = input("Age: ")

if age >= 16:
    print("Allowed")`,
solution: `age = int(input("Age: "))

if age >= 16:
    print("Allowed")`,
hint1: "What type of information does input() give Python?",
hint2: "Python may be comparing different data types.",
hint3: "Try converting the input into an integer."
}


];