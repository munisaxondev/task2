import { useState } from 'react'
import { initialCards } from './cards'
import './App.css'

function App() {
  const [cards, setCards] = useState(initialCards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[index]

  // Kartani aylantirish (savol <-> javob)
  const flipCard = () => setFlipped((f) => !f)

  // Keyingi karta
  const nextCard = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % cards.length)
  }

  // Oldingi karta
  const prevCard = () => {
    setFlipped(false)
    setIndex((i) => (i - 1 + cards.length) % cards.length)
  }

  // Kartalarni aralashtirish (Fisher–Yates)
  const shuffleCards = () => {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setCards(shuffled)
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Smart Flashcards</h1>
        <p className="subtitle">Tap the card to reveal the answer</p>
      </header>

      <div className="counter">
        Card {index + 1} / {cards.length}
      </div>

      <div
        className={`card ${flipped ? 'is-flipped' : ''}`}
        onClick={flipCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            flipCard()
          }
        }}
      >
        <div className="card-inner">
          <div className="card-face card-front">
            <span className="card-label">Question</span>
            <p className="card-text">{card.front}</p>
          </div>
          <div className="card-face card-back">
            <span className="card-label">Answer</span>
            <p className="card-text">{card.back}</p>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="btn btn-ghost" onClick={prevCard}>
          ‹ Prev
        </button>
        <button className="btn btn-ghost" onClick={shuffleCards}>
          ⤮ Shuffle
        </button>
        <button className="btn btn-primary" onClick={nextCard}>
          Next ›
        </button>
      </div>
    </div>
  )
}

export default App
