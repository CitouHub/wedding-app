import track1 from "./assets/01 - Jimmy's Gang.mp3";
import track2 from "./assets/01 Get Lucky.mp3";
import track3 from "./assets/03-Adrian_Lux_-_Teenage_Crime_(Original)__[Axtone_Records__2010-05-31].mp3";
import track4 from "./assets/03. deadmau5 & Kaskade – I Remember.mp3";
import track5 from "./assets/03. Kent - Dom Andra.mp3";
import track6 from "./assets/05. Kent - Palace & Main.mp3";
import track7 from "./assets/4 cazals - somebody somewhere blamma blamma somebody stop me mix.mp3";
import track8 from "./assets/80kidz - 08 - Miss Mars.mp3";
import track9 from "./assets/Adam Beyer - 19 - Redemption (FEAT. Jesper Dahlbäck).mp3";
import track10 from "./assets/Alter ego - 01 - Why not.mp3";
import track11 from "./assets/Anthony Rother - 02 - Father.mp3";
import track12 from "./assets/Antiloop - 02 - In my mind.mp3";
import track13 from "./assets/Bag raiders - 01 - Fun punch.mp3";
import track14 from "./assets/Bag raiders - 03 - Shooting stars.mp3";
import track15 from "./assets/Basement Jaxx - 06 - Wheres your head at.mp3";
import track16 from "./assets/Bingo Players - Rattle (Original Mix).mp3";
import track17 from "./assets/BLAMMA! BLAMMA! - 01 - Carry me home.mp3";
import track18 from "./assets/Booka shade - 01 - Night falls.mp3";
import track19 from "./assets/Boys noize - 01 - & down.mp3";
import track20 from "./assets/Cinnamon chasers - 07 - Luv deluxe.mp3";
import track21 from "./assets/Deadmau5 - 06 - Alone with you.mp3";
import track22 from "./assets/Deadmau5 - 09 - Not exactly.mp3";
import track23 from "./assets/Designer drugs - 01 - Zombies!.mp3";
import track24 from "./assets/Digitalism - 01 - Pogo (Digitalism's Pogo robotic remix).mp3";
import track25 from "./assets/Digitalism - 04 - Idealistic.mp3";
import track26 from "./assets/Duck sauce - 01 - Barbra Streisand.mp3";
import track27 from "./assets/Electric six - 08 - Gay bar.mp3";
import track28 from "./assets/Familjen - 01 - Nu händer det igen.mp3";
import track29 from "./assets/Familjen - 03 - Det snurrar i min skalle.mp3";
import track30 from "./assets/Gregor Tresher - 01 - Black rain.mp3";
import track31 from "./assets/Gregor Tresher - 02 - Battery.mp3";
import track32 from "./assets/Gui Boratto - 01 - Take my breath away.mp3";
import track33 from "./assets/Infected mushroom - 01 - Becoming insane.mp3";
import track34 from "./assets/Jacknife Lee - Making me money (switch remix).mp3";
import track35 from "./assets/Justice - 01 - Genesis.mp3";
import track36 from "./assets/Kid in the air - 01 - Your bitch.mp3";
import track37 from "./assets/Krack (Realboy Cover).mp3";
import track38 from "./assets/Maskinen - 01 - Alla som inte dansar.mp3";
import track39 from "./assets/MSTRKRFT - 01 - Work on you.mp3";
import track40 from "./assets/Quit your dayjob - Look a dollar.mp3";
import track41 from "./assets/Ratatat - 04 - Wildcat.mp3";
import track42 from "./assets/Rex the dog - 14 - I look into mid air.mp3";
import track43 from "./assets/Starlett Johansson _Blamma_ Blamma_ Scared By Spiders mix_.mp3";
import track44 from "./assets/Team jeans - 03 - Keine melodien.mp3";
import track45 from "./assets/The Bloody beetroots - 01 - Warp 1.9 (FEAT. Steve Aoki).mp3";
import track46 from "./assets/The Egg - Walking away.mp3";
import track47 from "./assets/The Knife - 01 - Heartbeats.mp3";
import track48 from "./assets/The Knife - 01 - Neon.mp3";
import { useParams } from "react-router-dom";
import './app.css';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
  
interface Track {
    artist: string,
    year?: number | undefined,
    title: string,
    file: string
}

interface Score {
    artist: number,
    year: number,
    title: number
}

const Tracks: Track[] = [
    { artist: "Parov Stelar", year: 2012, title: "I Remember", file: track1 },
    { artist: "Daft Punk", year: 2013, title: "Get Lucky", file: track2 },
    { artist: "Adrian Lux", year: 2010, title: "Teenage Crime", file: track3 },
    { artist: "Deadmau5", year: 2002, title: "I Remember", file: track4 },
    { artist: "Kent", year: 2002, title: "Dom Andra", file: track5 },
    { artist: "Kent", year: 2005, title: "Palace & Main", file: track6 },
    { artist: "BLAMMA! BLAMMA!", year: 2008, title: "Somebody somewhere", file: track7 },
    { artist: "80kidz", year: 2009, title: "This is my shit", file: track8 },
    { artist: "Adam Beyer", year: 2005, title: "Redemption", file: track9 },
    { artist: "Alter ego", year: 2007, title: "Why not", file: track10 },
    { artist: "Anthony Rother", year: 2004, title: "In my mind", file: track11 },
    { artist: "Antiloop", year: 1997, title: "I Remember", file: track12 },
    { artist: "Bag raiders", year: 2007, title: "Fun punch", file: track13 },
    { artist: "Bag raiders", year: 2008, title: "I Remember", file: track14 },
    { artist: "Basement Jaxx", year: 2005, title: "Wheres your head at", file: track15 },
    { artist: "Bingo Players", year: 2008, title: "Rattle", file: track16 },
    { artist: "BLAMMA! BLAMMA!", year: 2009, title: "Carry me home", file: track17 },
    { artist: "Booka shade", year: 2006, title: "Night falls", file: track18 },
    { artist: "Boys noize", year: 2007, title: "& down", file: track19 },
    { artist: "Cinnamon chasers", year: 2009, title: "Luv deluxe", file: track20 },
    { artist: "Deadmau5", year: 2008, title: "Alone with you", file: track21 },
    { artist: "Deadmau5", year: 2008, title: "Not exactly", file: track22 },
    { artist: "Designer drugs", year: 2009, title: "Zombies!", file: track23 },
    { artist: "Digitalism", year: 2008, title: "Pogo", file: track24 },
    { artist: "Digitalism", year: 2007, title: "Idealistic", file: track25 },
    { artist: "Duck sauce", year: 2010, title: "Barbra Streisand", file: track26 },
    { artist: "Electric six", year: 2003, title: "Gay bar", file: track27 },
    { artist: "Familjen", year: 2007, title: "Nu händer det igen", file: track28 },
    { artist: "Familjen", year: 2007, title: "Det snurrar i min skalle", file: track29 },
    { artist: "Gregor Tresher", year: 2006, title: "Black rain", file: track30 },
    { artist: "Gregor Tresher", year: 2006, title: "Battery", file: track31 },
    { artist: "Gui Boratto", year: 2009, title: "Take my breath away", file: track32 },
    { artist: "Infected mushroom", year: 2007, title: "Becoming insane", file: track33 },
    { artist: "Jacknife Lee", year: 2007, title: "Making Me Money", file: track34 },
    { artist: "Justice", year: 2007, title: "Genesis", file: track35 },
    { artist: "Kid in the air", year: 2009, title: "Your bitch", file: track36 },
    { artist: "Soulwax", year: 2004, title: "Krack", file: track37 },
    { artist: "Maskinen", year: 2007, title: "Alla som inte dansar", file: track38 },
    { artist: "MSTRKRFT", year: 2006, title: "Work on you", file: track39 },
    { artist: "Quit Your Dayjob", year: 2004, title: "Look! A dollar", file: track40 },
    { artist: "Ratatat", year: 2006, title: "Wildcat", file: track41 },
    { artist: "Rex the dog", year: 2008, title: "I look into mid air", file: track42 },
    { artist: "BLAMMA! BLAMMA!", year: 2009, title: "Starlett Johansson", file: track43 },
    { artist: "Team jeans", year: 2000, title: "Keine melodien", file: track44 },
    { artist: "The Bloody beetroots", year: 2014, title: "Warp 1.9", file: track45 },
    { artist: "The Egg", year: 2006, title: "Walking away", file: track46 },
    { artist: "The Knife", year: 2003, title: "Heartbeats", file: track47 },
    { artist: "The Knife", year: 2001, title: "Neon", file: track48 }
]

export default function Track() {
    const { trackIndex } = useParams();
    const [guess, setGuess] = useState<Track>({
        artist: "",
        title: "",
        file: ""
    });
    const [guessScore, setGuessScore] = useState<Score | undefined>();
    
    var track = Tracks[(trackIndex ?? 18) as number] ?? Tracks[18];

    const validateGuess = () => {
        var score: Score = {
            artist: 0,
            title: 0,
            year: 0
        };

        if (guess.artist !== undefined && guess.artist.length > 0) {
            if (guess.artist.toLowerCase() === track.artist.toLowerCase()) {
                score.artist = score.artist + 3;
            } else if (wordsMatch(track.artist.split(" "), guess.artist.split(" ")) >= 2) {
                score.artist = score.artist + 2;
            } else if (wordsMatch(track.artist.split(" "), guess.artist.split(" ")) >= 1) {
                score.artist = score.artist + 1;
            }
        }

        if (guess.title !== undefined && guess.title.length > 0) { 
            if (guess.title.toLowerCase() === track.title.toLowerCase()) {
                score.title = score.title + 3;
            } else if (wordsMatch(track.title.split(" "), guess.title.split(" ")) >= 2) {
                score.title = score.title + 2;
            } else if (wordsMatch(track.title.split(" "), guess.title.split(" ")) >= 1) {
                score.title = score.title + 1;
            }
        }

        if (guess.year !== undefined && track.year !== undefined) {
            if (guess.year === track.year) {
                score.year = score.year + 3;
            } else if (guess.year >= track.year - 1 && guess.year <= track.year + 1) {
                score.year = score.year + 2;
            } else if (guess.year >= track.year - 2 && guess.year <= track.year + 2) {
                score.year = score.year + 1;
            }
        }

        setGuessScore(score);
    }

    const wordsMatch = (masterList: string[], guessList: string[]) => {
        var matches = 0;
        masterList.forEach(word => {
            var match = guessList.find(_ => _.toLowerCase() === word.toLowerCase());
            matches = matches + (match !== undefined ? 1 : 0);
        });

        return matches;
    }

    const getTotalScore = () => {
        if (guessScore !== undefined) {
            return guessScore.artist + guessScore.title + guessScore.year;
        }
        
        return 0;
    }
    
    return (
        <div className='wrapper'>
            <div className='item'>
                {trackIndex !== undefined && <div className="item-content">
                    <audio controls src={track.file} />
                    <TextField
                        type='text'
                        className="helpText"
                        label="Artist"
                        value={guess.artist}
                        disabled={guessScore !== undefined}
                        onChange={e => {
                            setGuess({ ...guess, artist: e.target.value })
                        }}
                        helperText={guessScore !== undefined ? `Rätt är: "${track.artist}", poäng: ${guessScore.artist}` : ''}
                        sx={{
                            input: {
                                background: "white"
                            }
                        }}
                    />
                    <TextField
                        type='text'
                        className="helpText"
                        label="Titel"
                        value={guess.title}
                        disabled={guessScore !== undefined}
                        onChange={e => {
                            setGuess({ ...guess, title: e.target.value })
                        }}
                        helperText={guessScore !== undefined ? `Rätt är: "${track.title}", poäng: ${guessScore.title}` : ''}
                        sx={{
                            input: {
                                background: "white"
                            }
                        }}
                    />
                    <TextField
                        type='number'
                        className="helpText"
                        label="År"
                        value={guess.year}
                        disabled={guessScore !== undefined}
                        onChange={e => {
                            setGuess({ ...guess, year: Number(e.target.value) })
                        }}
                        helperText={guessScore !== undefined ? `Rätt är: "${track.year}", poäng: ${guessScore.year}` : ''}
                        sx={{
                            input: {
                                background: "white"
                            }
                        }}
                    />
                    {guessScore === undefined && <Button
                        id={`info-button`}
                        variant="contained"
                        onClick={validateGuess}
                        sx={{
                            background: "#4ea5de",
                            color: "black"
                        }}
                    >
                        Gissa låten
                    </Button>}
                    {guessScore !== undefined && <div style={{ maxWidth: '300px', paddingTop: '1rem' }}>
                        Poäng totalt: {getTotalScore()}
                        {getTotalScore() === 9 && <p>GODE GUD!!! Sjukt imponerande! Fan vilket kejsarpar ni är! Jag bugar framförer er djupt</p>}
                        {getTotalScore() <= 8 && getTotalScore() >= 6 && <p>Fantastisk! Akhila, jag är glad att du hittad Leo</p>}
                        {getTotalScore() <= 5 && getTotalScore() >= 4 && <p>Snyggt! Ni är gryma tillsamans, jag blir glad varje gång jag ser er!</p>}
                        {getTotalScore() <= 3 && getTotalScore() >= 1 && <p>...nja MYCKET mer än hade jag väntat mig. Akhila ge Leo lite smisk!</p>}
                        {getTotalScore() === 0 && <p>Men... Men... Leo och Akhila... FAN va besviken jag är...</p>}
                    </div>}
                </div>}
            </div>
        </div>
    )
  }