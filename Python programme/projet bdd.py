import ctypes, os, sys
from tkinter import *
from PIL import Image, ImageTk

if sys.platform.startswith("win"):
    ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID("LPWinners.App")
fenetre_ingame = Tk()
fenetre_ingame.title("LPWinners")
fenetre_ingame.geometry("1050x800")
fenetre_ingame.resizable(False, False)
fenetre_ingame.iconbitmap("Icone.ico")
fenetre_ingame.config(background='#2C3232')
joueurs = [
    ("Yanis", "Champie_Poppy_profileicon.webp"),
    ("Redwan", "Champie_Poppy_profileicon.webp"),
    ("Jimmy", "Champie_Poppy_profileicon.webp"),
    ("Bourama", "Champie_Poppy_profileicon.webp"),
    ("Darren", "Champie_Poppy_profileicon.webp"),
    ("Samuel", "Champie_Poppy_profileicon.webp"),
    ("Christophe", "Champie_Poppy_profileicon.webp"),
    ("Ziya", "Champie_Poppy_profileicon.webp"),
    ("Cheick tolly", "Champie_Poppy_profileicon.webp"),
    ("Damien", "Champie_Poppy_profileicon.webp"),
]
sauvegarde_image=[]
ensemble_joueurs = Frame(fenetre_ingame, bg="#181C1C")
ensemble_joueurs.pack(pady=30)
for i, (nom, image_courant) in enumerate(joueurs):
    case_ensemble_joueurs = Frame(ensemble_joueurs, bg="#222828", padx=10, pady=10)
    case_ensemble_joueurs.grid(row=i // 5, column=i % 5, padx=10, pady=10)

    image = Image.open(image_courant).resize((100, 100))
    img_tk = ImageTk.PhotoImage(image)
    sauvegarde_image.append(img_tk)

    label_img = Label(case_ensemble_joueurs, image=img_tk, bg="#222828")
    label_nom = Label(case_ensemble_joueurs, text=nom, bg="#222828", fg="#FFFFFF", font=("Arial", 12, "bold"))

    label_img.pack()
    label_nom.pack(pady=5)
fenetre_ingame.mainloop()