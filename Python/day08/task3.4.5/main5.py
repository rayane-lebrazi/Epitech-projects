import pygame

pygame.init()

screen = pygame.display.set_mode((600, 600))

background = pygame.image.load("background.jpg")
background = pygame.transform.scale(background, (600, 600))


def draw_stickman():
    pygame.draw.line(screen, "black", (150, 500), (150, 150), 8)
    pygame.draw.line(screen, "black", (150, 150), (350, 150), 8)
    pygame.draw.line(screen, "black", (350, 150), (350, 200), 8)
    pygame.draw.circle(screen, "black", (350, 240), 40, 6)
    pygame.draw.line(screen, "black", (350, 280), (350, 400), 8)
    pygame.draw.line(screen, "black", (350, 310), (300, 360), 8)
    pygame.draw.line(screen, "black", (350, 310), (400, 360), 8)
    pygame.draw.line(screen, "black", (350, 400), (300, 470), 8)
    pygame.draw.line(screen, "black", (350, 400), (400, 470), 8)


running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.blit(background, (0, 0))
    draw_stickman()
    pygame.display.flip()

pygame.quit()