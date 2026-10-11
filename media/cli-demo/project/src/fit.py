import json
import sys

import numpy as np

points, outliers, output = sys.argv[1:]
x, y = np.loadtxt(points, delimiter=",", skiprows=1, unpack=True)
if outliers == "clip":
    residuals = y - np.polyval(np.polyfit(x, y, 1), x)
    keep = np.abs(residuals) < 3 * residuals.std()
    x, y = x[keep], y[keep]
slope, intercept = np.polyfit(x, y, 1)
with open(output, "w") as f:
    json.dump({"slope": slope, "intercept": intercept, "n_used": len(x)}, f, indent=2)
