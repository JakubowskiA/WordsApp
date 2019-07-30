# require "rest-client"
# words = RestClient.get("https://norvig.com/ngrams/enable1.txt")

# wordsArray = words.body.split("\n")

# Word.destroy_all

# wordsArray.each do |word|
#   Word.create!(words: word)
# end

l1 = ["b", "i", "a", "n", "k", "g"]
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

g1 = Game.create!(letters: l1, difficulty: "easy")
g2 = Game.create!(letters: l2, difficulty: "easy")
g3 = Game.create!(letters: l3, difficulty: "easy")
g4 = Game.create!(letters: l4, difficulty: "easy")
g5 = Game.create!(letters: l5, difficulty: "easy")
g6 = Game.create!(letters: l6, difficulty: "medium")
g7 = Game.create!(letters: l7, difficulty: "medium")
g8 = Game.create!(letters: l8, difficulty: "medium")
g9 = Game.create!(letters: l9, difficulty: "medium")
g10 = Game.create!(letters: l10, difficulty: "medium")
g11 = Game.create!(letters: l11, difficulty: "hard")
g12 = Game.create!(letters: l12, difficulty: "hard")
g13 = Game.create!(letters: l13, difficulty: "hard")
g14 = Game.create!(letters: l14, difficulty: "hard")
g15 = Game.create!(letters: l15, difficulty: "hard")
