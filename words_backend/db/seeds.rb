Game.destroy_all

# require "rest-client"
# words = RestClient.get("https://norvig.com/ngrams/enable1.txt")

# wordsArray = words.body.split("\n")

# Word.destroy_all

# wordsArray.each do |word|
#   Word.create!(words: word)
# end
allWords = Word.all

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
  if (word.words.match(/^[biankg]+$/))
    p1 << word.words
  end
end

l2 = ["m", "r", "d", "a", "e", "s"]
l3 = ["e", "f", "s", "a", "l", "m"]
l4 = ["g", "r", "d", "o", "n", "a"]
l5 = ["r", "o", "e", "t", "f", "g"]
l6 = ["b", "s", "o", "t", "e", "a", "l", "u"]
l7 = ["h", "i", "k", "c", "n", "t", "e", "s"]
l8 = ["c", "r", "e", "i", "n", "d", "h", "l"]
l9 = ["l", "p", "e", "s", "n", "l", "a", "r"]
l10 = ["o", "l", "s", "e", "d", "p", "a", "r"]
l11 = ["d", "e", "o", "i", "j", "p", "a", "z", "r", "e"]
l12 = ["b", "p", "k", "a", "c", "c", "e", "k", "d", "a"]
l13 = ["c", "l", "i", "m", "o", "p", "c", "t", "d", "a"]
l14 = ["x", "p", "l", "i", "c", "e", "l", "b", "y", "a"]
l15 = ["k", "p", "k", "i", "c", "t", "e", "o", "p", "c"]

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
