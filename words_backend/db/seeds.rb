require "rest-client"
words = RestClient.get("https://norvig.com/ngrams/enable1.txt")

wordsArray = words.body.split("\n")

Word.destroy_all

wordsArray.each do |word|
  Word.create!(words: word)
end
