"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Check, Sparkles } from "lucide-react"

const FORM_OPTIONS = {
  // Child section
  childAge: [
    { value: "2-3", label: "2-3 ans" },
    { value: "4-5", label: "4-5 ans" },
    { value: "6+", label: "6+ ans" },
  ],
  duration: [
    { value: "3-4", label: "3-4 minutes" },
    { value: "5-6", label: "5-6 minutes" },
    { value: "7-8", label: "7-8 minutes" },
    { value: "9-10", label: "9-10 minutes" },
  ],
  // Story section
  world: [
    { value: "space", label: "Aventure spatiale 🚀" },
    { value: "forest", label: "Forêt magique 🌲" },
    { value: "dinosaurs", label: "Dinosaures 🦖" },
    { value: "knights", label: "Chevaliers & châteaux 🏰" },
    { value: "cowboys", label: "Cowboys 🤠" },
    { value: "animals", label: "Animaux 🐾" },
  ],
  theme: [
    { value: "courage", label: "Courage" },
    { value: "friendship", label: "Amitié" },
    { value: "sharing", label: "Partage" },
    { value: "patience", label: "Patience" },
    { value: "confidence", label: "Confiance en soi" },
  ],
  tone: [
    { value: "calm", label: "Calme & apaisant" },
    { value: "happy", label: "Joyeux & heureux" },
    { value: "proud", label: "Fier & valorisant" },
    { value: "moral", label: "Petite leçon de vie" },
  ],
  challenge: [
    { value: "fear", label: "Peur (noir, solitude, inconnu)" },
    { value: "problem", label: "Problème à résoudre" },
    { value: "danger", label: "Quelqu'un en danger" },
    { value: "misunderstanding", label: "Malentendu" },
    { value: "competition", label: "Compétition" },
  ],
  // Characters section
  hero: [
    { value: "explorer", label: "Explorateur curieux" },
    { value: "dreamer", label: "Rêveur timide" },
    { value: "adventurer", label: "Aventurier courageux" },
    { value: "thinker", label: "Penseur malin" },
    { value: "troublemaker", label: "Farceur espiègle" },
  ],
  villain: [
    { value: "mirror", label: "Le Reflet Sombre" },
    { value: "believer", label: "Le Croyant Fanatique" },
    { value: "chaos", label: "L'Agent du Chaos" },
    { value: "authority", label: "L'Autorité Corrompue" },
    { value: "nature", label: "La Force de la Nature" },
    { value: "none", label: "Pas de villain" },
  ],
  mentor: [
    { value: "animal", label: "Animal sage" },
    { value: "creature", label: "Créature magique" },
    { value: "friend", label: "Ami plus âgé" },
    { value: "object", label: "Objet parlant" },
    { value: "none", label: "Pas de mentor" },
  ],
  trickster: [
    { value: "silly", label: "Personnage rigolo" },
    { value: "chaos", label: "Chaos inattendu" },
    { value: "funny", label: "Malentendus drôles" },
    { value: "magic", label: "Magie espiègle" },
    { value: "none", label: "Pas de trickster" },
  ],
}

type FormValues = {
  // Child section
  childAge: string
  duration: string
  // Story section
  world: string
  theme: string
  tone: string
  challenge: string
  // Characters section
  hero: string
  villain: string
  mentor: string
  trickster: string
}

function generateName(): string {
  const consonants = "bcdfghjklmnprstvz"
  const vowels = "aeiou"
  let name = ""
  for (let i = 0; i < 3; i++) {
    name += consonants[Math.floor(Math.random() * consonants.length)]
    name += vowels[Math.floor(Math.random() * vowels.length)]
  }
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function getRandomOption<T>(options: T[]): T {
  return options[Math.floor(Math.random() * options.length)]
}

function generatePrompt(values: FormValues): string {
  const heroName = generateName()
  const mentorName = values.mentor !== "none" ? generateName() : null
  const tricksterName = values.trickster !== "none" ? generateName() : null

  const worldLabels: Record<string, string> = {
    space: "une aventure spatiale",
    forest: "une forêt magique",
    dinosaurs: "un monde de dinosaures",
    knights: "un royaume de chevaliers et châteaux",
    cowboys: "le Far West des cowboys",
    animals: "un monde d'animaux parlants",
  }

  const heroLabels: Record<string, string> = {
    explorer: "un explorateur curieux",
    dreamer: "un rêveur timide",
    adventurer: "un aventurier courageux",
    thinker: "un penseur malin",
    troublemaker: "un farceur espiègle",
  }

  const challengeLabels: Record<string, string> = {
    fear: "affronter ses peurs (le noir, la solitude, l'inconnu)",
    problem: "résoudre un problème difficile",
    danger: "sauver quelqu'un en danger",
    misunderstanding: "clarifier un malentendu",
    competition: "relever un défi ou une compétition",
  }

  const villainLabels: Record<string, string> = {
    mirror: "un reflet sombre partageant les compétences et pouvoirs du héros",
    believer: "un fanatique convaincu de faire le bien en commettant le mal",
    chaos: "un nihiliste qui veut simplement voir le monde brûler",
    authority: "un leader oppressif utilisant le système pour écraser les autres",
    nature: "une force primale imparable avec laquelle on ne peut pas raisonner",
    none: "",
  }

  const mentorLabels: Record<string, string> = {
    animal: "un animal sage",
    creature: "une créature magique",
    friend: "un ami plus âgé",
    object: "un objet parlant",
    none: "",
  }

  const tricksterLabels: Record<string, string> = {
    silly: "un personnage rigolo",
    chaos: "un agent du chaos inattendu",
    funny: "un créateur de malentendus drôles",
    magic: "un farceur magique espiègle",
    none: "",
  }

  const themeLabels: Record<string, string> = {
    courage: "le courage",
    friendship: "l'amitié",
    sharing: "le partage",
    patience: "la patience",
    confidence: "la confiance en soi",
  }

  const toneLabels: Record<string, string> = {
    calm: "calme et apaisante",
    happy: "joyeuse et heureuse",
    proud: "fière et valorisante",
    moral: "avec une petite leçon de vie",
  }

  const ageContext =
    values.childAge === "2-3"
      ? "très simple, avec des phrases courtes et répétitives"
      : values.childAge === "4-5"
        ? "adapté aux 4-5 ans, avec un vocabulaire accessible"
        : "adapté aux 6 ans et plus, avec plus de détails et de nuances"

  const villainName = values.villain !== "none" ? generateName() : null

  let prompt = `Crée une histoire du soir pour un enfant de ${values.childAge} ans. L'histoire doit être ${ageContext}.

**Durée de lecture** : ${values.duration} minutes

**Univers** : ${worldLabels[values.world]}

**Thème central** : ${themeLabels[values.theme]}

**Ton** : L'histoire doit être ${toneLabels[values.tone]}

**Défi principal** : ${heroName} devra ${challengeLabels[values.challenge]}

---

**Personnages :**

**Héros** : ${heroName}, ${heroLabels[values.hero]}`

  if (villainName && villainLabels[values.villain]) {
    prompt += `

**Villain** : ${villainName}, ${villainLabels[values.villain]}`
  }

  if (mentorName && mentorLabels[values.mentor]) {
    prompt += `

**Mentor** : ${mentorName}, ${mentorLabels[values.mentor]}, guidera ${heroName}`
  }

  if (tricksterName && tricksterLabels[values.trickster]) {
    prompt += `

**Trickster** : ${tricksterName}, ${tricksterLabels[values.trickster]}`
  }

  prompt += `

---

**Structure narrative à suivre (Le Voyage du Héros simplifié) :**

**Acte 1 - Mise en place**
1. Monde ordinaire : La vie normale de ${heroName} avant tout changement
2. Appel à l'aventure : Quelque chose perturbe son quotidien${villainName ? ` (lié à ${villainName})` : ""}
3. Hésitation : ${heroName} doute ou a peur
4. Rencontre du mentor : ${mentorName ? `${mentorName} apparaît pour l'aider` : "Une idée ou un courage intérieur émerge"}
5. Passage du seuil : ${heroName} s'engage dans l'aventure

**Acte 2 - Transformation**
6. Épreuves et alliés : ${heroName} découvre ce nouveau monde${tricksterName ? `, rencontre ${tricksterName}` : ""}
7. Approche de la grotte : La tension monte${villainName ? ` face à ${villainName}` : ""}
8. Épreuve centrale : ${heroName} affronte ${villainName ? villainName : "son défi"}
9. Récompense : ${heroName} gagne quelque chose de précieux (sagesse, objet, confiance)
10. Chemin du retour : Le retour commence mais tout n'est pas fini

**Acte 3 - Résolution**
11. Résurrection : Dernier test prouvant la transformation de ${heroName}
12. Retour avec l'élixir : ${heroName} revient changé et apporte de la valeur aux autres

---

**Conseils importants :**
- Focus sur la transformation intérieure, pas seulement les événements
- L'épreuve centrale doit être émotionnellement forte
- Les enjeux doivent augmenter progressivement
- La fin doit apporter une vraie clôture émotionnelle`

  return prompt
}

export function StoryForm() {
  const [values, setValues] = useState<FormValues>({
    childAge: "",
    duration: "",
    world: "",
    theme: "",
    tone: "",
    challenge: "",
    hero: "",
    villain: "",
    mentor: "",
    trickster: "",
  })
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Randomize on load
    setValues({
      childAge: getRandomOption(FORM_OPTIONS.childAge).value,
      duration: getRandomOption(FORM_OPTIONS.duration).value,
      world: getRandomOption(FORM_OPTIONS.world).value,
      theme: getRandomOption(FORM_OPTIONS.theme).value,
      tone: getRandomOption(FORM_OPTIONS.tone).value,
      challenge: getRandomOption(FORM_OPTIONS.challenge).value,
      hero: getRandomOption(FORM_OPTIONS.hero).value,
      villain: getRandomOption(FORM_OPTIONS.villain).value,
      mentor: getRandomOption(FORM_OPTIONS.mentor).value,
      trickster: getRandomOption(FORM_OPTIONS.trickster).value,
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const prompt = generatePrompt(values)
    setGeneratedPrompt(prompt)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateValue = (key: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Child Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Enfant
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Child Age */}
            <div className="space-y-2">
              <Label htmlFor="childAge" className="text-sm font-medium text-foreground">
                Âge
              </Label>
              <Select value={values.childAge} onValueChange={(v) => updateValue("childAge", v)}>
                <SelectTrigger id="childAge" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.childAge.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                Durée
              </Label>
              <Select value={values.duration} onValueChange={(v) => updateValue("duration", v)}>
                <SelectTrigger id="duration" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.duration.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Histoire
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* World */}
            <div className="space-y-2">
              <Label htmlFor="world" className="text-sm font-medium text-foreground">
                Univers
              </Label>
              <Select value={values.world} onValueChange={(v) => updateValue("world", v)}>
                <SelectTrigger id="world" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.world.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-sm font-medium text-foreground">
                Thème
              </Label>
              <Select value={values.theme} onValueChange={(v) => updateValue("theme", v)}>
                <SelectTrigger id="theme" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.theme.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-sm font-medium text-foreground">
                Ton
              </Label>
              <Select value={values.tone} onValueChange={(v) => updateValue("tone", v)}>
                <SelectTrigger id="tone" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.tone.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Challenge */}
            <div className="space-y-2">
              <Label htmlFor="challenge" className="text-sm font-medium text-foreground">
                Défi
              </Label>
              <Select value={values.challenge} onValueChange={(v) => updateValue("challenge", v)}>
                <SelectTrigger id="challenge" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.challenge.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Characters Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Personnages
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Hero */}
            <div className="space-y-2">
              <Label htmlFor="hero" className="text-sm font-medium text-foreground">
                Héros
              </Label>
              <Select value={values.hero} onValueChange={(v) => updateValue("hero", v)}>
                <SelectTrigger id="hero" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.hero.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Villain */}
            <div className="space-y-2">
              <Label htmlFor="villain" className="text-sm font-medium text-foreground">
                Antagoniste
              </Label>
              <Select value={values.villain} onValueChange={(v) => updateValue("villain", v)}>
                <SelectTrigger id="villain" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.villain.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mentor */}
            <div className="space-y-2">
              <Label htmlFor="mentor" className="text-sm font-medium text-foreground">
                Mentor
              </Label>
              <Select value={values.mentor} onValueChange={(v) => updateValue("mentor", v)}>
                <SelectTrigger id="mentor" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.mentor.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Trickster */}
            <div className="space-y-2">
              <Label htmlFor="trickster" className="text-sm font-medium text-foreground">
                Trickster
              </Label>
              <Select value={values.trickster} onValueChange={(v) => updateValue("trickster", v)}>
                <SelectTrigger id="trickster" className="bg-card border-border">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {FORM_OPTIONS.trickster.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Générer le prompt
        </Button>
      </form>

      {generatedPrompt && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Votre prompt :</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-border hover:bg-secondary"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copier
                </>
              )}
            </Button>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
              {generatedPrompt}
            </pre>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Copiez ce prompt et collez-le dans votre IA préférée (ChatGPT, Claude, Mistral...)
          </p>
        </div>
      )}
    </div>
  )
}
