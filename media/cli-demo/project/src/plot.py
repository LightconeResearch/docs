import json
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

points, fit, output = sys.argv[1:]
x, y = np.loadtxt(points, delimiter=",", skiprows=1, unpack=True)
with open(fit) as f:
    fit = json.load(f)

fig, ax = plt.subplots()
ax.scatter(x, y, s=12)
xs = np.linspace(x.min(), x.max(), 2)
ax.plot(xs, fit["slope"] * xs + fit["intercept"], color="C1")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title(f"slope = {fit['slope']:.3f}")
fig.savefig(output, dpi=150)
