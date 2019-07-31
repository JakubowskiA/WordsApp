Game.destroy_all

require "rest-client"
words = RestClient.get("https://norvig.com/ngrams/enable1.txt")

wordsArray = words.body.split("\n")

Word.destroy_all

wordsArray.each do |word|
  Word.create!(words: word)
end
allWords = Word.all

def checkWord(req, test)
  iterator = 0
  if (test.match(/^[#{req}]+$/))
    test.split("").each do |char|
      if test.scan(/#{char}/).length == req.scan(/#{char}/).length || test.scan(/#{char}/).length < req.scan(/#{char}/).length
        iterator += 1
      end
    end
  end

  if iterator == test.length
    return true
  else
    return false
  end
end

p1 = []
p2 = []
p3 = []
p4 = []
p5 = []
p6 = []
p7 = []
p8 = []
p9 = []
p10 = []
p11 = []
p12 = []
p13 = []
p14 = []
p15 = []

l1 = ["b", "i", "a", "n", "k", "g"]

allWords.each do |word|
  if (checkWord(l1.join(""), word.words) == true)
    p1 << word.words
  end
end

l2 = ["m", "r", "d", "a", "e", "s"]

allWords.each do |word|
  if (checkWord(l2.join(""), word.words) == true)
    p2 << word.words
  end
end
l3 = ["e", "f", "s", "a", "l", "m"]

allWords.each do |word|
  if (checkWord(l3.join(""), word.words) == true)
    p3 << word.words
  end
end
l4 = ["g", "r", "d", "o", "n", "a"]

allWords.each do |word|
  if (checkWord(l4.join(""), word.words) == true)
    p4 << word.words
  end
end
l5 = ["r", "o", "e", "t", "f", "g"]

allWords.each do |word|
  if (checkWord(l5.join(""), word.words) == true)
    p5 << word.words
  end
end
l6 = ["b", "s", "o", "t", "e", "a", "l", "u"]

allWords.each do |word|
  if (checkWord(l6.join(""), word.words) == true)
    p6 << word.words
  end
end
l7 = ["h", "i", "k", "c", "n", "t", "e", "s"]

allWords.each do |word|
  if (checkWord(l7.join(""), word.words) == true)
    p7 << word.words
  end
end
l8 = ["c", "r", "e", "i", "n", "d", "h", "l"]

allWords.each do |word|
  if (checkWord(l8.join(""), word.words) == true)
    p8 << word.words
  end
end
l9 = ["l", "p", "e", "s", "n", "l", "a", "r"]

allWords.each do |word|
  if (checkWord(l9.join(""), word.words) == true)
    p9 << word.words
  end
end
l10 = ["o", "l", "s", "e", "d", "p", "a", "r"]

allWords.each do |word|
  if (checkWord(l10.join(""), word.words) == true)
    p10 << word.words
  end
end
l11 = ["d", "e", "o", "i", "j", "p", "a", "z", "r", "e"]

allWords.each do |word|
  if (checkWord(l11.join(""), word.words) == true)
    p11 << word.words
  end
end
l12 = ["b", "p", "k", "a", "c", "c", "e", "k", "d", "a"]

allWords.each do |word|
  if (checkWord(l12.join(""), word.words) == true)
    p12 << word.words
  end
end
l13 = ["c", "l", "i", "m", "o", "p", "c", "t", "d", "a"]

allWords.each do |word|
  if (checkWord(l13.join(""), word.words) == true)
    p13 << word.words
  end
end
l14 = ["x", "p", "l", "i", "c", "e", "l", "b", "y", "a"]

allWords.each do |word|
  if (checkWord(l14.join(""), word.words) == true)
    p14 << word.words
  end
end
l15 = ["k", "p", "k", "i", "c", "t", "e", "o", "p", "c"]

allWords.each do |word|
  if (checkWord(l15.join(""), word.words) == true)
    p15 << word.words
  end
end

g1 = Game.create!(letters: l1, difficulty: "easy", possibilities: p1)
g2 = Game.create!(letters: l2, difficulty: "easy", possibilities: p2)
g3 = Game.create!(letters: l3, difficulty: "easy", possibilities: p3)
g4 = Game.create!(letters: l4, difficulty: "easy", possibilities: p4)
g5 = Game.create!(letters: l5, difficulty: "easy", possibilities: p5)
g6 = Game.create!(letters: l6, difficulty: "medium", possibilities: p6)
g7 = Game.create!(letters: l7, difficulty: "medium", possibilities: p7)
g8 = Game.create!(letters: l8, difficulty: "medium", possibilities: p8)
g9 = Game.create!(letters: l9, difficulty: "medium", possibilities: p9)
g10 = Game.create!(letters: l10, difficulty: "medium", possibilities: p10)
g11 = Game.create!(letters: l11, difficulty: "hard", possibilities: p11)
g12 = Game.create!(letters: l12, difficulty: "hard", possibilities: p12)
g13 = Game.create!(letters: l13, difficulty: "hard", possibilities: p13)
g14 = Game.create!(letters: l14, difficulty: "hard", possibilities: p14)
g15 = Game.create!(letters: l15, difficulty: "hard", possibilities: p15)
