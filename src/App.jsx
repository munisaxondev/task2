import { useState } from 'react'
import './App.css'

const initialCards = [
  { front: 'What is React?', back: 'A JavaScript library for building user interfaces.' },
  { front: 'What is a component?', back: 'A reusable, self-contained piece of UI.' },
  { front: 'What is a hook?', back: 'A function that lets you use state and other React features.' },
  { front: 'What does useState return?', back: 'A state value and a function to update it.' },
  { front: 'What is JSX?', back: 'A syntax extension that lets you write HTML-like code in JavaScript.' },
]

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function App() {
  const [cards, setCards] = useState(initialCards)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[index]

  const nextCard = () => {
    setFlipped(false)
    setIndex((prev) => (prev + 1) % cards.length)
  }

  const shuffleCards = () => {
    setFlipped(false)
    setCards(shuffle(cards))
    setIndex(0)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Smart Flashcards</h1>
        <p className="subtitle">Tap a card to reveal the answer</p>
      </header>

      <main className="board">
        <div
          className={`card ${flipped ? 'is-flipped' : ''}`}
          onClick={() => setFlipped((f) => !f)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setFlipped((f) => !f)
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

        <p className="counter">
          Card {index + 1} of {cards.length}
        </p>

        <div className="controls">
          <button className="btn btn-primary" onClick={nextCard}>
            Next card
          </button>
          <button className="btn btn-secondary" onClick={shuffleCards}>
            Shuffle cards
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
