import { useState, useEffect } from "react";
import { GameBanner } from "./components/GameBanner";

import { Check, GameController, MagnifyingGlassPlus } from "phosphor-react";
import { Input } from "./components/Form/Input";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Checkbox from "@radix-ui/react-checkbox";

import * as Dialog from "@radix-ui/react-dialog";

import Logo from "./assets/logo.svg";
import "./styles/main.css";

interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

function App() {
	const [games, setGames] = useState<Game[]>([]);
	const [weekDays, setWeekDays] = useState<string[]>([]);

	useEffect(() => {
		fetch("http://localhost:3333/games")
			.then((res) => res.json())
			.then((data) => setGames(data));
		console.log(games);
	}, []);

	function handleCreateAd(e: React.FormEvent) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
	}

	return (
		<div
			className="max-w-[1344px] mx-auto flex flex-col items-center
		my-20"
		>
			<img src={Logo} alt="NLW eSports" />
			<h1 className="text-6xl text-white font-black mt-20">
				Seu{" "}
				<span className="text-transparent bg-nlw-gradient bg-clip-text">
					duo
				</span>{" "}
				está aqui.
			</h1>

			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map((game) => {
					return (
						<GameBanner
							bannerUrl={game.bannerUrl}
							title={game.title}
							adsCount={game._count.ads}
						/>
					);
				})}
			</div>

			<Dialog.Root>
				<div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
					<div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
						<div>
							<strong className="text-2xl text-white font-black block">
								Não encontrou seu duo?
							</strong>
							<span className="text-zinc-400 block">
								Publique um anúncio para encontrar novos players!
							</span>
						</div>

						<Dialog.Trigger className="flex items-center gap-3 py-3 px-4 bg-violet-500 transition-all hover:bg-violet-600 text-white rounded">
							<MagnifyingGlassPlus size={24} />
							Publicar anúncio
						</Dialog.Trigger>
					</div>
				</div>

				<Dialog.Portal>
					<Dialog.Overlay className="bg-black/60 inset-0 fixed" />

					<Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
						<Dialog.Title className="text-3xl font-black">
							Publique um anúncio
						</Dialog.Title>

						<form
							onSubmit={handleCreateAd}
							className="mt-8 flex flex-col gap-4"
						>
							<div className="flex flex-col gap-2">
								<label htmlFor="game" className="font-semibold">
									Qual o game?
								</label>
								<select
									className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
									id="game"
									defaultValue=""
								>
									<option disabled value="">
										Selecione o game que deseja jogar
									</option>
									{games.map((game) => {
										return (
											<option key={game.id} value={game.id}>
												{game.title}
											</option>
										);
									})}
								</select>
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="name">Seu nome (ou nickname)</label>
								<Input id="name" placeholder="Como te chamam dentro do jogo?" />
							</div>

							<div className="grid grid-cols-2 gap-6">
								<div className="flex flex-col gap-2">
									<label htmlFor="yearsPlaying">Joga há quantos anos?</label>
									<Input
										type="number"
										id="yearsPlaying"
										placeholder="Tudo bem ser ZERO"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="discord">Qual seu Discord?</label>
									<Input type="text" placeholder="Usuario#0000" id="discord" />
								</div>
							</div>

							<div className="flex gap-6">
								<div className="flex flex-col gap-2">
									<label htmlFor="weekDays">Quando costuma jogar?</label>

									<ToggleGroup.Root
										className="grid grid-cols-4 gap-2"
										type="multiple"
										value={weekDays}
										onValueChange={setWeekDays}
									>
										<ToggleGroup.Item
											value="0"
											title="Domingo"
											className={`w-8 h-8 rounded ${
												weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
											}`}
										>
											D
										</ToggleGroup.Item>
										<ToggleGroup.Item
											value="1"
											className={`w-8 h-8 rounded ${
												weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
											}`}
											title="Segunda"
										>
											S
										</ToggleGroup.Item>
										<ToggleGroup.Item
											value="2"
											className={`w-8 h-8 rounded ${
												weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
											}`}
											title="Terça"
										>
											T
										</ToggleGroup.Item>
										<ToggleGroup.Item
											value="3"
											className={`w-8 h-8 rounded ${
												weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
											}`}
											title="Quarta"
										>
											Q
										</ToggleGroup.Item>
										<ToggleGroup.Item
											value="4"
											className={`w-8 h-8 rounded ${
												weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
											}`}
											title="Quinta"
										>
											Q
										</ToggleGroup.Item>
										<ToggleGroup.Item
											value="5"
											className={`w-8 h-8 rounded ${
												weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
											}`}
											title="Sexta"
										>
											S
										</ToggleGroup.Item>
										<ToggleGroup.Item
											value="6"
											className={`w-8 h-8 rounded ${
												weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
											}`}
											title="Sábado"
										>
											S
										</ToggleGroup.Item>
									</ToggleGroup.Root>
								</div>
								<div className="flex flex-col gap-2 flex-1">
									<label htmlFor="hourStart">Qual horário do dia?</label>
									<div className="grid grid-cols-2 gap-2">
										<Input id="hourStart" type="time" placeholder="De" />
										<Input id="hourEnd" type="time" placeholder="Até" />
									</div>
								</div>
							</div>

							<label className="mt-2 flex items-center gap-2 text-sm">
								<Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
									<Checkbox.Indicator>
										<Check className="w-4 h-4 text-emerald-400" />
									</Checkbox.Indicator>
								</Checkbox.Root>
								Costumo me conectar ao chat de voz
							</label>

							<footer className="mt-4 flex justify-end gap-4">
								<Dialog.Close
									type="button"
									className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-all"
								>
									Cancelar
								</Dialog.Close>
								<button
									className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-all"
									type="submit"
								>
									<GameController size={24} />
									Encontrar duo
								</button>
							</footer>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}

export default App;
