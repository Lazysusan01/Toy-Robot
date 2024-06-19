class Robot:
    DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST']

    def __init__(self):
        self.x = None
        self.y = None
        self.facing_index = None
        self.placed = False

    def place(self, x, y, facing):
        if 0 <= x <= 4 and 0 <= y <= 4 and facing in self.DIRECTIONS:
            self.x = x
            self.y = y
            self.facing_index = self.DIRECTIONS.index(facing)
            self.placed = True

    def move(self):
        if not self.placed:
            return
        if self.DIRECTIONS[self.facing_index] == 'NORTH' and self.y < 4:
            self.y += 1
        elif self.DIRECTIONS[self.facing_index] == 'SOUTH' and self.y > 0:
            self.y -= 1
        elif self.DIRECTIONS[self.facing_index] == 'EAST' and self.x < 4:
            self.x += 1
        elif self.DIRECTIONS[self.facing_index] == 'WEST' and self.x > 0:
            self.x -= 1

    def left(self):
        if not self.placed:
            return
        self.facing_index = (self.facing_index - 1) % 4

    def right(self):
        if not self.placed:
            return
        self.facing_index = (self.facing_index + 1) % 4

    def report(self):
        if not self.placed:
            return None
        return {
            "x": self.x,
            "y": self.y,
            "facing": self.DIRECTIONS[self.facing_index]
        }

robot = Robot()